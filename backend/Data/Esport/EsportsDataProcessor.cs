using LeagueChampions.Models.Entity.Esport;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Data.Esport
{
  public class EsportsDataProcessor
  {
    private readonly EsportDataResult _esportData;
    private readonly IDbContextFactory<AppDbContext> _contextFactory;
    public EsportsDataProcessor(IDbContextFactory<AppDbContext> contextFactory, EsportDataResult esportData)
    {
      _contextFactory = contextFactory;
      _esportData = esportData;
    }

    public void Process()
    {
      using var context = _contextFactory.CreateDbContext();
      ProcessLeagues(context);
      ProcessPlayers(context);
      ProcessTeams(context);
      ProcessGames(context);
      ProcessBans(context);
      ProcessPicks(context);
    }

    private void ProcessLeagues(AppDbContext context)
    {
      Console.WriteLine("Processing leagues ...");
      var existingLeagueNames = context.EsportLeague
          .Select(l => l.Name.ToLowerInvariant())
          .ToHashSet();

      var newLeagues = _esportData.Leagues
          .Where(l => !string.IsNullOrWhiteSpace(l.Name) && !existingLeagueNames.Contains(l.Name.ToLowerInvariant()))
          .Select(l => new EsportLeague { Name = l.Name })
          .ToList();

      if (newLeagues.Count == 0)
      {
        Console.WriteLine("Nothing to add");
        return;
      }

      context.EsportLeague.AddRange(newLeagues);
      context.SaveChanges();
      Console.WriteLine($"Added {newLeagues.Count} leagues");
    }

    private void ProcessPlayers(AppDbContext context)
    {
      Console.WriteLine("Processing players ...");
      var existingPlayerNames = context.EsportPlayer
          .Select(p => p.Name.ToLowerInvariant())
          .ToHashSet();

      var newPlayers = _esportData.Players
          .Where(p => !string.IsNullOrWhiteSpace(p.Name) && !existingPlayerNames.Contains(p.Name.ToLowerInvariant()))
          .Select(p => new EsportPlayer
          {
            Name = p.Name,
            MostPlayedPositionId = (int)p.MainPosition
          })
          .ToList();

      if (newPlayers.Count == 0)
      {
        Console.WriteLine("Nothing to add");
        return;
      }

      context.EsportPlayer.AddRange(newPlayers);
      context.SaveChanges();
      Console.WriteLine($"Added {newPlayers.Count} players");
    }

    private void ProcessTeams(AppDbContext context)
    {
      Console.WriteLine("Processing teams ...");
      var existingTeamNames = context.EsportTeam
          .Select(l => l.Name.ToLowerInvariant())
          .ToHashSet();

      var newTeams = _esportData.Teams
          .Where(t => !string.IsNullOrWhiteSpace(t.Name) && !existingTeamNames.Contains(t.Name.ToLowerInvariant()))
          .Select(t => new EsportTeam
          {
            Name = t.Name
          })
          .ToList();

      if (newTeams.Count == 0)
      {
        Console.WriteLine("Nothing to add");
        return;
      }

      context.EsportTeam.AddRange(newTeams);
      context.SaveChanges();
      Console.WriteLine($"Added {newTeams.Count} teams");
    }

    private void ProcessGames(AppDbContext context)
    {
      Console.WriteLine("Processing games ...");
      var existingGameCodes = context.EsportGame
          .Select(g => g.Id.ToLowerInvariant())
          .ToHashSet();

      var newGames = _esportData.Games
          .Where(l => !string.IsNullOrWhiteSpace(l.GameId) && !existingGameCodes.Contains(l.GameId.ToLowerInvariant()))
          .ToList();

      if (newGames.Count == 0)
      {
        Console.WriteLine("Nothing to add");
        return;
      }

      var leagueNames = newGames.Select(g => g.LeagueName.ToLowerInvariant())
                                .ToHashSet();

      var leaguesMap = context.EsportLeague
                              .AsEnumerable()
                              .Where(l => leagueNames.Contains(l.Name.ToLowerInvariant()))
                              .ToDictionary(l => l.Name);

      var gamesToAdd = newGames.Select(l => new EsportGame
      {
        Id = l.GameId,
        Date = DateTime.SpecifyKind(l.Date, DateTimeKind.Utc),
        Patch = string.IsNullOrWhiteSpace(l.Patch) ? null : l.Patch,
        Year = l.Year,
        Split = string.IsNullOrWhiteSpace(l.Split) ? null : l.Split,
        LeagueId = leaguesMap[l.LeagueName].Id
      });

      context.EsportGame.AddRange(gamesToAdd);
      context.SaveChanges();
      Console.WriteLine($"Added {newGames.Count} games");
    }

    private void ProcessBans(AppDbContext context)
    {
      Console.WriteLine("Processing bans ...");

      var currentBanCount = context.EsportBan.Count();
      var teams = context.EsportTeam
                          .AsEnumerable()
                         .GroupBy(t => t.Name.ToLowerInvariant())
                         .ToDictionary(g => g.Key, g => g.First());
      var champions = context.Champion.ToDictionary(c => c.Name.ToLower());

      var missingInChampions = _esportData.Bans
          .Select(g => g.BannedChampionName.ToLower())
          .Except(champions.Keys)
          .ToHashSet();

      var bansToAdd = _esportData.Bans
          .Where(ban => !missingInChampions.Contains(ban.BannedChampionName.ToLower()))
          .Select(ban => new
          {
            GameId = ban.GameId,
            TeamId = teams[ban.TeamName.ToLowerInvariant()].Id,
            ChampionId = champions[ban.BannedChampionName.ToLower()].ChampionId
          })
          .ToList();

      if (bansToAdd.Count == 0)
      {
        Console.WriteLine("Nothing to add");
        return;
      }

      int batchSize = 10000;
      for (int i = 0; i < bansToAdd.Count; i += batchSize)
      {
        var batch = bansToAdd.Skip(i).Take(batchSize).ToList();

        var values = new List<string>();
        var parameters = new List<object>();
        int paramIndex = 0;

        foreach (var ban in batch)
        {
          values.Add($"(@p{paramIndex}, @p{paramIndex + 1}, @p{paramIndex + 2})");
          parameters.Add(ban.GameId);
          parameters.Add(ban.TeamId);
          parameters.Add(ban.ChampionId);
          paramIndex += 3;
        }

        var sql = $@"
            INSERT INTO ""EsportBan"" (""GameId"", ""TeamId"", ""ChampionId"")
            VALUES {string.Join(", ", values)}
            ON CONFLICT (""GameId"", ""TeamId"", ""ChampionId"") DO NOTHING;";

        context.Database.ExecuteSqlRaw(sql, parameters.ToArray());
        Console.WriteLine($"Processed batch {i / batchSize + 1} / {bansToAdd.Count / batchSize + 1}.");
      }

      var updatedBanCount = context.EsportBan.Count();
      Console.WriteLine($"Added {updatedBanCount - currentBanCount} bans");
    }

    private void ProcessPicks(AppDbContext context)
    {
      Console.WriteLine("Processing picks ...");

      var currentPicksCount = context.EsportPick.Count();

      var champions = context.Champion.ToDictionary(c => c.Name.ToLower());
      var players = context.EsportPlayer
                         .AsEnumerable()
                         .GroupBy(t => t.Name.ToLowerInvariant())
                         .ToDictionary(g => g.Key, g => g.First());

      var teams = context.EsportTeam
                         .AsEnumerable()
                         .GroupBy(t => t.Name.ToLowerInvariant())
                         .ToDictionary(g => g.Key, g => g.First());

      var games = context.EsportGame.ToDictionary(c => c.Id.ToLower());

      var missingInChampions = _esportData.Picks
          .Select(g => g.ChampionName.ToLower())
          .Except(champions.Keys)
          .ToHashSet();

      var picksToAdd = _esportData.Picks
          .Where(pick => !missingInChampions.Contains(pick.ChampionName.ToLower()))
          .Select(pick => new EsportPick
          {
            Victory = pick.Victory,
            Side = pick.MapSide,
            PlayerId = players[pick.PlayerName.ToLowerInvariant()].Id,
            ChampionId = champions[pick.ChampionName.ToLower()].ChampionId,
            GameId = pick.GameId,
            TeamId = teams[pick.TeamName.ToLowerInvariant()].Id,
            PositionId = (int)pick.Position
          })
          .ToList();

      if (picksToAdd.Count == 0)
      {
        Console.WriteLine("Nothing to add");
        return;
      }

      int batchSize = 9000;
      for (int i = 0; i < picksToAdd.Count; i += batchSize)
      {
        var batch = picksToAdd.Skip(i).Take(batchSize).ToList();

        var values = new List<string>();
        var parameters = new List<object>();
        int paramIndex = 0;

        foreach (var pick in batch)
        {
          values.Add($"(@p{paramIndex}, @p{paramIndex + 1}, @p{paramIndex + 2}, @p{paramIndex + 3}, @p{paramIndex + 4}, @p{paramIndex + 5}, @p{paramIndex + 6})");

          parameters.Add(pick.GameId);
          parameters.Add(pick.TeamId);
          parameters.Add(pick.PlayerId);
          parameters.Add(pick.ChampionId);
          parameters.Add(pick.PositionId);
          parameters.Add(pick.Victory);
          parameters.Add(pick.Side);

          paramIndex += 7;
        }

        var sql = $@"
        INSERT INTO ""EsportPick"" 
            (""GameId"", ""TeamId"", ""PlayerId"", ""ChampionId"", ""PositionId"", ""Victory"", ""Side"")
        VALUES {string.Join(", ", values)}
        ON CONFLICT (""GameId"", ""TeamId"", ""PlayerId"", ""ChampionId"", ""PositionId"") DO NOTHING;";

        context.Database.ExecuteSqlRaw(sql, parameters.ToArray());
        Console.WriteLine($"Processed batch {i / batchSize + 1} / {picksToAdd.Count / batchSize + 1}.");
      }

      var updatedPicksCount = context.EsportPick.Count();
      Console.WriteLine($"Added {updatedPicksCount - currentPicksCount} picks");
    }
  }
}

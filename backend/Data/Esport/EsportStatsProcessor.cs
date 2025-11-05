using LeagueChampions.Models.Entity.Esport;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Data.Esport
{
  public class EsportStatsProcessor
  {
    private readonly EsportDataResult _esportData;
    private readonly IDbContextFactory<AppDbContext> _contextFactory;
    public EsportStatsProcessor(IDbContextFactory<AppDbContext> contextFactory, EsportDataResult esportData)
    {
      _contextFactory = contextFactory;
      _esportData = esportData;

      var playerNames = _esportData.Players.Select(c => c.Name).ToHashSet();
      var missing = ANALYZED_PLAYERS.Where(player => !playerNames.Contains(player)).ToList();
      if (missing.Any())
      {
        throw new Exception("Player missing");
      }
    }

    public void ProcessStats()
    {
      using var context = _contextFactory.CreateDbContext();
      ProcessChampionStats(context);
      ProcessPlayers(context);
      ProcessPlayerPicks(context);
    }

    private void ProcessChampionStats(AppDbContext context)
    {
      List<int> existingStatsChampionId = context.EsportChampionStats.Select(s => s.ChampionId).ToList();

      int totalGamesCount = _esportData.Picks.Select(p => p.GameId).Distinct().Count();
      var championStats = _esportData.Picks
        .GroupBy(p => p.ChampionName)
        .Select(g => new
        {
          Champion = g.Key,
          GamesPlayed = g.Select(p => p.GameId).Distinct().Count(),
          TotalPicks = g.Count(),
          Wins = g.Count(p => p.Victory),
          WinRatio = g.Any()
            ? g.Count(p => p.Victory) / (double)g.Count()
            : 0.0,
          PickRatio = totalGamesCount > 0
            ? g.Select(p => p.GameId).Distinct().Count() / (double)totalGamesCount
            : 0.0
        })
        .OrderByDescending(x => x.GamesPlayed)
        .ToList();

      var championBanStats = _esportData.Bans
        .GroupBy(b => b.BannedChampionName)
        .Select(g => new
        {
          Champion = g.Key,
          TotalBans = g.Count(),
          GamesBannedIn = g.Select(b => b.GameId).Distinct().Count(),
          BanRatio = totalGamesCount > 0
                ? g.Select(b => b.GameId).Distinct().Count() / (double)totalGamesCount
                : 0.0
        })
        .OrderByDescending(x => x.BanRatio)
        .ToList();


      var champions = context.Champion.ToDictionary(c => c.Name.ToLower());
      var missingInChampions = _esportData.Picks
        .Select(c => c.ChampionName.ToLower())
        .Union(_esportData.Bans.Select(b => b.BannedChampionName.ToLower()))
        .Select(g => g.ToLower())
        .Except(champions.Keys)
        .ToHashSet();

      IEnumerable<EsportChampionStats> esportChampionStats = championStats
        .GroupJoin(
            championBanStats,
            pick => pick.Champion,
            ban => ban.Champion,
            (pick, bans) => new
            {
              Champion = pick.Champion,
              PickRatio = pick.PickRatio,
              WinRatio = pick.WinRatio,
              BanRatio = bans.FirstOrDefault()?.BanRatio ?? 0.0,
            }
        )
        .Where(x => !missingInChampions.Contains(x.Champion.ToLower()))
        .Select(x => new EsportChampionStats
        {
          ChampionId = champions[x.Champion.ToLower()].ChampionId,
          BanRatio = x.BanRatio * 100,
          WinRatio = x.WinRatio * 100,
          PickRatio = x.PickRatio * 100
        })
        .Where(stat => !existingStatsChampionId.Contains(stat.ChampionId));

      Console.WriteLine("Added champion stats: " + esportChampionStats.Count());
      context.EsportChampionStats.AddRange(esportChampionStats);
      context.SaveChanges();
    }

    private void ProcessPlayers(AppDbContext context)
    {
      var existingPlayerNames = context.EsportPlayer
          .Select(p => p.Name.ToLowerInvariant())
          .ToHashSet();

      var newPlayers = _esportData.Players
          .Where(p => ANALYZED_PLAYERS.Contains(p.Name) &&
                      !string.IsNullOrWhiteSpace(p.Name) &&
                      !existingPlayerNames.Contains(p.Name.ToLowerInvariant()))
          .Select(p => new EsportPlayer
          {
            Name = p.Name,
            MostPlayedPositionId = (int)p.MainPosition
          })
          .ToList();

      if (newPlayers.Count == 0)
      {
        return;
      }
      Console.WriteLine("Added players: " + newPlayers.Count);
      context.EsportPlayer.AddRange(newPlayers);
      context.SaveChanges();
    }

    private void ProcessPlayerPicks(AppDbContext context)
    {
      var existingTopPicks = context.EsportPlayerPick
                                    .Select(p => new { p.PlayerId, p.ChampionId })
                                    .ToHashSet();

      var players = context.EsportPlayer
                           .AsEnumerable()
                           .GroupBy(t => t.Name.ToLowerInvariant())
                           .ToDictionary(g => g.Key, g => g.First());

      var champions = context.Champion.ToDictionary(c => c.Name.ToLower());

      var topPlayerPicks = ANALYZED_PLAYERS
          .SelectMany(playerName =>
              _esportData.Picks
                  .Where(p => p.PlayerName == playerName)
                  .GroupBy(p => p.ChampionName)
                  .OrderByDescending(g => g.Count())
                  .Take(5)
                  .Select(g => new EsportPlayerPick
                  {
                    PlayerId = players[playerName.ToLowerInvariant()].Id,
                    ChampionId = champions[g.Key.ToLower()].ChampionId
                  })
          )
          .Where(pick => !existingTopPicks.Contains(new { pick.PlayerId, pick.ChampionId }))
          .ToList();

      Console.WriteLine("Added top player picks: " + topPlayerPicks.Count);
      context.EsportPlayerPick.AddRange(topPlayerPicks);
      context.SaveChanges();

    }

    public static List<string> ANALYZED_PLAYERS = new List<string>
      {
        "Faker",
        "Uzi",
        "Deft",
        "TheShy",
        "Rookie",
        "ShowMaker",
        "Canyon",
        "Perkz",
        "Caps",
        "JackeyLove",
        "Ruler",
        "Keria",
        "Mata",
        "Bengi",
        "Bang",
        "Ambition",
        "Doinb",
        "Scout",
        "MaRin",
        "Rekkles",
        "Jankos",
        "Bwipo",
        "Hylissang",
        "Hans Sama",
        "Upset",
        "Bjergsen",
        "Doublelift",
        "Impact",
        "Sneaky",
        "CoreJJ",
        "Blaber",
        "brTT",
        "Revolta",
        "Kami",
        "tinowns",
        "Chovy",
        "Peanut",
        "Knight",
        "369",
        "Zeus",
        "Gumayusi",
        "Levi",
        "Evi",
        "Froggen",
        "xPeke",
        "Maple",
        "Tarzan",
        "Score",
        "Ming",
        "Meiko",
        "aphromoo",
        "Vander",
        "IgNar"
      };
  }
}

using CsvHelper;
using LeagueChampions.Models.Enums;
using System.Globalization;

namespace LeagueChampions.Data.Esport
{
  public class EsportDataReader
  {
    public static EsportDataResult LoadData(IEnumerable<string> paths)
    {
      EsportDataResult result = new EsportDataResult();

      var records = new List<CsvModel>();
      foreach (string path in paths)
      {
        Console.WriteLine("Processing result from: {0}", path);

        using var reader = new StreamReader(path);
        using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
        csv.Context.RegisterClassMap<CsvRecordMap>();
        records.AddRange(csv.GetRecords<CsvModel>());

      }

      var playerMainPositions = records
        .Where(r => r.Position.HasValue && !string.IsNullOrWhiteSpace(r.PlayerName))
        .GroupBy(r => r.PlayerName)
        .ToDictionary(
            g => g.Key,
            g => g.GroupBy(r => r.Position)
                  .Select(pg => new { Position = pg.Key, Count = pg.Count() })
                  .OrderByDescending(pg => pg.Count)
                  .First().Position!
        );

      foreach (var r in records)
      {
        if (!string.IsNullOrWhiteSpace(r.League))
        {
          result.Leagues.Add(new LeagueCsv(r.League));
        }

        if (!string.IsNullOrWhiteSpace(r.GameId))
        {
          result.Games.Add(new GameCsv(r.GameId, r.League, r.Split, r.Date, r.Patch, r.Year));
        }

        if (!string.IsNullOrWhiteSpace(r.PlayerName))
        {
          result.Players.Add(new PlayerCsv(r.PlayerName, (PositionType)playerMainPositions[r.PlayerName]!));
        }

        if (!string.IsNullOrWhiteSpace(r.TeamName))
        {
          result.Teams.Add(new TeamCsv(r.TeamName));
        }

        if (!string.IsNullOrWhiteSpace(r.TeamName) && !string.IsNullOrWhiteSpace(r.Champion))
        {
          foreach (var ban in r.Bans.Distinct())
          {
            result.Bans.Add(new BanCsv(r.GameId, r.TeamName, ban));
          }
          if (r.Position is not null && !string.IsNullOrWhiteSpace(r.PlayerName))
          {
            result.Picks.Add(new PickCsv(r.PlayerName, r.Champion, r.GameId, r.TeamName, (PositionType)r.Position, r.Victory, r.Side));
          }
        }
      }


      Console.WriteLine($"--- READ ---");
      Console.WriteLine($"Leagues: {result.Leagues.Count}");
      Console.WriteLine($"Games: {result.Games.Count}");
      Console.WriteLine($"Players: {result.Players.Count}");
      Console.WriteLine($"Teams: {result.Teams.Count}");
      Console.WriteLine($"Bans: {result.Bans.Count}");
      Console.WriteLine($"Picks: {result.Picks.Count}");

      return result;
    }
  }

  public class EsportDataResult
  {
    public HashSet<LeagueCsv> Leagues { get; private set; } = new();
    public HashSet<GameCsv> Games { get; private set; } = new();
    public HashSet<PlayerCsv> Players { get; private set; } = new();
    public HashSet<TeamCsv> Teams { get; private set; } = new();
    public HashSet<BanCsv> Bans { get; private set; } = new();
    public HashSet<PickCsv> Picks { get; private set; } = new();
  }
}

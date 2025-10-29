using CsvHelper;
using EsportData.Models;
using System.Globalization;

namespace EsportData
{
  internal class Program
  {
    static async Task Main(string[] args)
    {
      var path = "Source/2014_LoL_esports_match_data_from_OraclesElixir.csv";

      using var reader = new StreamReader(path);
      using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
      csv.Context.RegisterClassMap<CsvRecordMap>();

      var records = csv.GetRecords<CsvRecord>().ToList();

      Console.WriteLine($"Loaded {records.Count()} records.");


      var leagues = records.Select(r => new League(1, r.League)).ToHashSet();
      var games = records.Select(r => new Game(r.GameId, r.League, r.Date, r.Patch, r.Year)).ToHashSet();
      var players = records.Select(r => new Player(r.PlayerName)).ToHashSet();
      var teams = records.Select(r => new Team(r.TeamName)).ToHashSet();


      var gameBans = records.GroupBy(r => r.GameId)
                      .ToDictionary(
                        g => g.Key,
                        g => g.GroupBy(e => e.TeamName)
                               .ToDictionary(
                                  t => t.Key,
                                  t => t.SelectMany(b => b.Bans).Distinct().ToList()
                               )
      );

      List<GameBan> gameBanList = new();
      foreach (var gameBansKvp in gameBans)
      {
        string gameId = gameBansKvp.Key;
        foreach (var teamBansKvp in gameBansKvp.Value)
        {
          string teamId = teamBansKvp.Key;
          var bans = teamBansKvp.Value.Select(championId => new GameBan(gameId, teamId, championId));
          gameBanList.AddRange(bans);
        }
      }

      List<PlayerChampion> playerChampionList = new List<PlayerChampion>();
      var playerChampions = records.GroupBy(r => r.PlayerName)
                                   .OrderBy(g => g.Key)
                                   .ToDictionary(
                                      p => p.Key,
                                      p => p.ToList()
                                   );
      foreach (var playerKvp in playerChampions)
      {
        string playerId = playerKvp.Key;
        foreach (var gameRecord in playerKvp.Value)
        {
          var playerChampion = new PlayerChampion(playerId, gameRecord.Champion, gameRecord.GameId, gameRecord.TeamId, gameRecord.Position, gameRecord.Result);
          playerChampionList.Add(playerChampion);
        }
      }
    }
  }
}

using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Filters;
using LeagueChampions.Models.ValueObjects;
using System.Diagnostics.Metrics;

namespace LeagueChampions.Metrics
{
  public class LeagueTacToeMetrics
  {
    public static string Name = "LeagueTacToe";

    private Counter<int> GamesCreatedCounter { get; }
    private Counter<int> RoomsCreatedCounter { get; }
    private Counter<int> ChampionGuessesCounter { get; }
    private Counter<int> BoardFieldsCounter { get; }

    public LeagueTacToeMetrics(IMeterFactory meterFactory)
    {
      var meter = meterFactory.Create(Name);

      RoomsCreatedCounter = meter.CreateCounter<int>("room.created.count");
      GamesCreatedCounter = meter.CreateCounter<int>("game.created.count");
      ChampionGuessesCounter = meter.CreateCounter<int>("champion.guess.count");
      BoardFieldsCounter = meter.CreateCounter<int>("board.fields.count");
    }

    public void AddRoomCreated(Room room) => RoomsCreatedCounter.Add(
      1,
      new KeyValuePair<string, object?>("room.public", room.IsPublic),
      new KeyValuePair<string, object?>("room.stealsEnabled", room.StealsEnabled),
      new KeyValuePair<string, object?>("room.turnTime", room.TurnTime),
      new KeyValuePair<string, object?>("room.createdAt", room.CreatedAt)
      );

    public void AddGameCraeted(Game game) => GamesCreatedCounter.Add(1,
      new KeyValuePair<string, object?>("game.createdAt", game.CreatedAt)
      );

    public void AddChampionGuess(string championName, ChampionFilter championFilter) => ChampionGuessesCounter.Add(
      1,
      new KeyValuePair<string, object?>("champion.name", championName),
      new KeyValuePair<string, object?>("champion.fields", championFilter.GetFilterSummary())
      );

    public void AddBoardFields(GameCategories gameCategories) => BoardFieldsCounter.Add(
      1,
      new KeyValuePair<string, object?>("board.fields", gameCategories.GetAllSummary()),
      new KeyValuePair<string, object?>("board.vertical", gameCategories.GetVerticalSummary()),
      new KeyValuePair<string, object?>("board.horizontal", gameCategories.GetHorizontalSummary())
      );
  }
}

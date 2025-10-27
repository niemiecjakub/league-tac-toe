using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Enums;
using LeagueChampions.Models.Filters;
using LeagueChampions.Models.ValueObjects;
using LeagueChampions.Service.Interfaces;
using System.Diagnostics.Metrics;

namespace LeagueChampions.Metrics
{
  public class LeagueTacToeMetrics
  {
    public static string Name = "LeagueTacToe";
    private readonly ILogger<LeagueTacToeMetrics> _logger;
    private readonly IServiceProvider _serviceProvider;

    private Counter<int> GamesCreatedCounter { get; }
    private Counter<int> RoomsCreatedCounter { get; }
    private Counter<int> ChampionGuessesCounter { get; }
    private Counter<int> BoardFieldsCounter { get; }
    private Counter<int> PublicGameCounter { get; }

    private Dictionary<GameStateType, int> _latestCounts = new();

    public LeagueTacToeMetrics(ILogger<LeagueTacToeMetrics> logger, IMeterFactory meterFactory, IServiceProvider serviceProvider)
    {
      _logger = logger;
      _serviceProvider = serviceProvider;


      var meter = meterFactory.Create(Name);

      RoomsCreatedCounter = meter.CreateCounter<int>("room.created.count");
      GamesCreatedCounter = meter.CreateCounter<int>("game.created.count");
      ChampionGuessesCounter = meter.CreateCounter<int>("champion.guess.count");
      BoardFieldsCounter = meter.CreateCounter<int>("board.fields.count");
      PublicGameCounter = meter.CreateCounter<int>("public.game.count");
      ObservableGauge<int> gameStateCounter = meter.CreateObservableGauge<int>("game.state.count", ObserveGameStates);

      _ = Task.Run(RefreshLoopAsync);
    }

    public void AddPublicGameAttempt(PublicGameResult result) => PublicGameCounter.Add(
      1,
      new KeyValuePair<string, object?>("room.result", result)
      );

    public void AddRoomCreated(Room room) => RoomsCreatedCounter.Add(
      1,
      new KeyValuePair<string, object?>("room.public", room.IsPublic),
      new KeyValuePair<string, object?>("room.stealsEnabled", room.StealsEnabled),
      new KeyValuePair<string, object?>("room.turnTime", room.TurnTime),
      new KeyValuePair<string, object?>("room.createdAt", room.CreatedAt.ToShortDateString())
      );

    public void AddGameCraeted(Game game) => GamesCreatedCounter.Add(1,
      new KeyValuePair<string, object?>("game.createdAt", game.CreatedAt.ToShortDateString())
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


    private IEnumerable<Measurement<int>> ObserveGameStates()
    {
      foreach (var kvp in _latestCounts)
      {
        yield return new Measurement<int>(
            kvp.Value,
            new KeyValuePair<string, object?>("state", kvp.Key.ToString())
        );
      }
    }

    private async Task RefreshLoopAsync()
    {
      while (true)
      {
        try
        {
          using var scope = _serviceProvider.CreateScope();
          var gameService = scope.ServiceProvider.GetRequiredService<IGameService>();
          _latestCounts = await gameService!.GetGamesByStateCount();
        }
        catch (Exception ex)
        {
          _logger.LogError(ex, $"Metrics refresh failed: {ex.Message}");
        }
        await Task.Delay(TimeSpan.FromSeconds(1));
      }
    }
  }

  public enum PublicGameResult
  {
    Found,
    Created
  }
}

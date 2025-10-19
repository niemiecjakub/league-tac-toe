using LeagueChampions.Models.Enums;
using LeagueChampions.Models.ValueObjects;
using Newtonsoft.Json;

namespace LeagueChampions.Models.Entity
{
  public class Game
  {
    public int Id { get; set; }
    public Guid RoomUID { get; set; }
    public string BoardState { get; set; } = null!;
    public string Categories { get; set; } = null!;
    public PlayerType CurrentTurnId { get; set; }
    public GameStateType StatusId { get; set; }
    public PlayerType? WinnerId { get; set; }
    public PlayerType? DrawRequestedId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public Room Room { get; set; } = null!;

    public void Start()
    {
      StatusId = GameStateType.InProgress;
    }

    public MoveResult MakeMove(int fieldId, string championName, IEnumerable<Champion> possibleChampions, GamePlayer player)
    {
      var moveResult = MoveResult.MISS;
      var board = new GameBoard(GetGameBoard());
      bool isMatch = possibleChampions.Any(c => c.Name == championName);

      bool canUserSteal = Room.StealsEnabled && player.HasSteals;
      if (isMatch && board.IsValidMove(fieldId, championName, canUserSteal))
      {
        moveResult = board.MakeMove(fieldId, championName, CurrentTurnId);
      }

      if (board.CheckWin(CurrentTurnId))
      {
        SetCurrentPlayerWin();
      }
      else if (board.IsDraw())
      {
        SetDraw();
      }
      else
      {
        SetNextPlayerTurn();
        CancelDrawRequest();
      }

      BoardState = board.Serialize();

      return moveResult;
    }

    public void RequestDraw()
    {
      if (DrawRequestedId != null)
      {
        return;
      }
      DrawRequestedId = CurrentTurnId;
    }

    public void SetDraw()
    {
      StatusId = GameStateType.Finished;
      WinnerId = null;
    }

    private void SetCurrentPlayerWin()
    {
      StatusId = GameStateType.Finished;
      WinnerId = CurrentTurnId;
    }

    public void Close()
    {
      StatusId = GameStateType.Abandoned;
    }

    public bool IsDraw => StatusId == GameStateType.Finished && WinnerId == null;
    public bool IsFinished => StatusId == GameStateType.Finished;
    public void SetNextPlayerTurn() => CurrentTurnId = CurrentTurnId == PlayerType.X ? PlayerType.O : PlayerType.X;
    public void CancelDrawRequest() => DrawRequestedId = null;
    public void UpdateDate() => UpdatedAt = DateTime.UtcNow;
    public GameCategories GetGameCategories() => JsonConvert.DeserializeObject<GameCategories>(Categories)!;
    public BoardField[][] GetGameBoard() => JsonConvert.DeserializeObject<BoardField[][]>(BoardState)!;
  }
}

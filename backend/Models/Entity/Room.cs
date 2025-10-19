using LeagueChampions.Models.Enums;
using LeagueChampions.Models.ValueObjects;
using Newtonsoft.Json;

namespace LeagueChampions.Models.Entity
{
  public class Room
  {
    public Guid RoomUID { get; set; }
    public int? TurnTime { get; set; }
    public bool StealsEnabled { get; set; }
    public bool IsPublic { get; set; }
    public DateTime CreatedAt { get; set; }
    public ICollection<Game> Games { get; set; } = new List<Game>();
    public ICollection<GamePlayer> GamePlayers { get; set; } = new List<GamePlayer>();

    public static Room Create(RoomOptions options)
    {
      options.Validate();
      var roomGuid = Guid.NewGuid();

      return new Room
      {
        RoomUID = roomGuid,
        StealsEnabled = options.StealsEnabled,
        TurnTime = options.TurnTime,
        IsPublic = options.IsPublic,
        CreatedAt = DateTime.UtcNow
      };
    }

    public Game CreateNewGame(GameCategories categories)
    {
      var game = new Game
      {
        RoomUID = RoomUID,
        StatusId = GameStateType.Created,
        CurrentTurnId = PlayerType.X,
        Categories = JsonConvert.SerializeObject(categories),
        BoardState = JsonConvert.SerializeObject(GameBoard.InitializeEmpty()),
      };
      Games.Add(game);

      return game;
    }

    public GamePlayer Join(Guid userGuid)
    {
      if (IsPlayerJoined(userGuid))
        return GetPlayer(userGuid);

      if (GamePlayers.Count >= 2)
        throw new InvalidOperationException("Room is full");

      var newPlayer = new GamePlayer
      {
        PlayerUID = userGuid,
        PlayerId = AssignPlayerType(),
        RoomUID = RoomUID,
        Room = this,
        Steals = 3
      };

      GamePlayers.Add(newPlayer);

      if (GamePlayers.Count == 2)
      {
        GetLastestGame().Start();
      }

      return newPlayer;
    }

    public Game GetLastestGame()
    {
      return Games.OrderByDescending(g => g.CreatedAt).First();
    }

    private PlayerType AssignPlayerType()
    {
      if (GamePlayers.Count == 0)
      {
        return (PlayerType)new Random().Next(1, 3);
      }

      var existingPlayer = GamePlayers.First().PlayerId;
      return existingPlayer == PlayerType.X ? PlayerType.O : PlayerType.X;
    }

    public bool IsPlayerJoined(Guid playerGuid)
    {
      return GamePlayers.Any(gp => gp.PlayerUID == playerGuid);
    }

    public GamePlayer GetPlayer(Guid playerGuid)
    {
      return GamePlayers.First(gp => gp.PlayerUID == playerGuid);
    }
  }
}

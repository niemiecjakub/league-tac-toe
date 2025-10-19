using LeagueChampions.Models.Enums;

namespace LeagueChampions.Models.Dto
{
  public class GameDto
  {
    public int Id { get; set; }
    public string RoomUid { get; set; } = null!;
    public string BoardState { get; set; } = null!;
    public string Categories { get; set; } = null!;
    public PlayerType CurrentPlayerTurn { get; set; }
    public GameStateType GameStatus { get; set; }
    public PlayerType? Winner { get; set; }
    public PlayerType? DrawRequestedId { get; set; }
  }
}

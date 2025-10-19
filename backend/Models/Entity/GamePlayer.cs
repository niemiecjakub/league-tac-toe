using LeagueChampions.Models.Enums;

namespace LeagueChampions.Models.Entity
{
  public class GamePlayer
  {
    public int Id { get; set; }
    public Guid RoomUID { get; set; }
    public Guid PlayerUID { get; set; }
    public PlayerType PlayerId { get; set; }
    public Room Room { get; set; } = null!;
    public int? Steals { get; set; }
    public bool HasSteals => Steals != null && Steals > 0;
  }
}

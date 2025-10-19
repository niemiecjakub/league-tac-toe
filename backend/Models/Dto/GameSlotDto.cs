using LeagueChampions.Models.Enums;

namespace LeagueChampions.Models.Dto
{
  public class GameSlotDto
  {
    public PlayerType PlayerType { get; set; }
    public int? Steals { get; set; }
  }
}

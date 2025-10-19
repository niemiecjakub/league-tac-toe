namespace LeagueChampions.Models.Dto
{
  public class RoomDto : RoomInfoDto
  {
    public GameDto Game { get; set; } = null!;
    public GameSlotDto Slot { get; set; } = null!;
    public ScoreDto Score { get; set; } = null!;
  }
}

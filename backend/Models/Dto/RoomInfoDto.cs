namespace LeagueChampions.Models.Dto
{
  public class RoomInfoDto
  {
    public string RoomGuid { get; set; } = null!;
    public bool StealsEnabled { get; set; }
    public int? TurnTime { get; set; }
    public bool IsPublic { get; set; }
  }
}

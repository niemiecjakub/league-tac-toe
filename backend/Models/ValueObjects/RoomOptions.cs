namespace LeagueChampions.Models.ValueObjects
{
  public class RoomOptions
  {
    public int? TurnTime { get; set; }
    public bool StealsEnabled { get; set; }
    public bool IsPublic { get; set; }
    public bool IncludeEsportCategories { get; set; }

    public void Validate()
    {
      if (TurnTime <= 0) TurnTime = null;
    }

    public static RoomOptions DefaultPublicRoomOptions = new RoomOptions()
    {
      IsPublic = true,
      TurnTime = 30,
      StealsEnabled = true,
      IncludeEsportCategories = true,
    };
  }
}

namespace LeagueChampions.Models.Entity
{
  public class ChampionRegion
  {
    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;

    public int RegionId { get; set; }
    public Region Region { get; set; } = null!;
  }
}

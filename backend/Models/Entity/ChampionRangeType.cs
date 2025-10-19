namespace LeagueChampions.Models.Entity
{
  public class ChampionRangeType
  {
    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;

    public int RangetypeId { get; set; }
    public RangeType RangeType { get; set; } = null!;
  }
}

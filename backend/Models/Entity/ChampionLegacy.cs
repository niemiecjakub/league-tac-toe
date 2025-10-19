namespace LeagueChampions.Models.Entity
{
  public class ChampionLegacy
  {
    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;

    public int LegacyId { get; set; }
    public Legacy Legacy { get; set; } = null!;
  }
}

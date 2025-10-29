namespace LeagueChampions.Models.Entity
{
  public class ChampionResource
  {
    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;

    public int ResourceId { get; set; }
    public Resource Resource { get; set; } = null!;
  }
}

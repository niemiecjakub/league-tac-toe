namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportPlayerPick
  {
    public int PlayerId { get; set; }
    public EsportPlayer Player { get; set; } = null!;

    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;
  }
}

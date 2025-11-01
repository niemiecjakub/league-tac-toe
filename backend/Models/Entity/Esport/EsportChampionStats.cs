namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportChampionStats
  {
    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;

    public double PickRatio { get; set; }
    public double WinRatio { get; set; }
    public double BanRatio { get; set; }
  }
}

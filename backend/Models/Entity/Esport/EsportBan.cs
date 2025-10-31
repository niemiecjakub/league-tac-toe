namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportBan
  {
    public string GameId { get; set; } = null!;
    public EsportGame Game { get; set; } = null!;

    public int TeamId { get; set; }
    public EsportTeam Team { get; set; } = null!;

    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;
  }
}

namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportTeam
  {
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public ICollection<EsportPick> Picks { get; set; } = null!;
    public ICollection<EsportBan> Bans { get; set; } = null!;
  }
}

namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportPlayer
  {
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public ICollection<EsportPick> Picks { get; set; } = null!;
  }
}

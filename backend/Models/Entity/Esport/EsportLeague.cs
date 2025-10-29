namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportLeague
  {
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public ICollection<EsportGame> Games { get; set; } = null!;
  }
}

namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportGame
  {
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Patch { get; set; } = null!;
    public DateTime Date { get; set; }
    public int Year { get; set; }
    public string Split { get; set; } = null!;

    public int LeagueId { get; set; }
    public EsportLeague League { get; set; } = null!;

    public ICollection<EsportPick> Picks { get; set; } = null!;
    public ICollection<EsportBan> Bans { get; set; } = null!;
  }
}

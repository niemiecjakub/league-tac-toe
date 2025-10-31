namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportGame
  {
    public string Id { get; set; } = null!;
    public string? Patch { get; set; }
    public DateTime Date { get; set; }
    public int Year { get; set; }
    public string? Split { get; set; } = null!;

    public int LeagueId { get; set; }
    public EsportLeague League { get; set; } = null!;

    public ICollection<EsportPick> Picks { get; set; } = null!;
    public ICollection<EsportBan> Bans { get; set; } = null!;
  }
}

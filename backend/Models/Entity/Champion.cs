using LeagueChampions.Models.Entity.Esport;

namespace LeagueChampions.Models.Entity
{
  public class Champion
  {
    public int ChampionId { get; set; }
    public string ChampionKey { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
    public DateTime ReleaseDate { get; set; }

    public EsportChampionStats EsportStats { get; set; } = null!;
    public ICollection<EsportPlayerPick> TopPlayerPicks { get; set; } = null!;

    public ICollection<ChampionResource> ChampionResource { get; set; } = null!;
    public ICollection<ChampionRegion> ChampionRegion { get; set; } = null!;
    public ICollection<ChampionLegacy> ChampionLegacy { get; set; } = null!;
    public ICollection<ChampionPosition> ChampionPosition { get; set; } = null!;
    public ICollection<ChampionRangeType> ChampionRangeType { get; set; } = null!;
    public ICollection<EsportPick> Picks { get; set; } = null!;
    public ICollection<EsportBan> Bans { get; set; } = null!;
  }
}

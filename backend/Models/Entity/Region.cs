using LeagueChampions.Models.Abstraction;

namespace LeagueChampions.Models.Entity
{
  public class Region : MetaFilterItem
  {
    public ICollection<ChampionRegion> ChampionRegion { get; set; } = null!;
  }
}
using LeagueChampions.Models.Abstraction;

namespace LeagueChampions.Models.Entity
{
  public class Resource : MetaFilterItem
  {
    public ICollection<ChampionResource> ChampionResource { get; set; } = null!;
  }
}
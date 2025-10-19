using LeagueChampions.Models.Abstraction;

namespace LeagueChampions.Models.Entity
{
  public class Legacy : MetaFilterItem
  {
    public ICollection<ChampionLegacy> ChampionLegacy { get; set; } = new List<ChampionLegacy>();
  }
}
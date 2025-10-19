using LeagueChampions.Models.Abstraction;

namespace LeagueChampions.Models.Entity
{
  public class RangeType : MetaFilterItem
  {
    public ICollection<ChampionRangeType> ChampionRangeType { get; set; } = null!;
  }
}
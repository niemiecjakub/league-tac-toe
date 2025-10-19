using LeagueChampions.Models.Abstraction;

namespace LeagueChampions.Models.Entity
{
  public class Position : MetaFilterItem
  {
    public ICollection<ChampionPosition> ChampionPosition { get; set; } = null!;
  }
}
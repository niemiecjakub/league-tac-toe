using LeagueChampions.Models.Abstraction;
using LeagueChampions.Models.Entity.Esport;

namespace LeagueChampions.Models.Entity
{
  public class Position : MetaFilterItem
  {
    public ICollection<ChampionPosition> ChampionPosition { get; set; } = null!;
    public ICollection<EsportPick> Picks { get; set; } = null!;
  }
}

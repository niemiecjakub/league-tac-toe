using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IRangeTypeRepository
  {
    Task<IEnumerable<RangeType>> GetAllAsync();
  }
}

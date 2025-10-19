using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IRegionRepository
  {
    Task<IEnumerable<Region>> GetAllAsync();
  }
}

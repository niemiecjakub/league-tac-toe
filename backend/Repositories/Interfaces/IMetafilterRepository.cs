using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IMetafilterRepository
  {
    Task<IEnumerable<Position>> GetAllPositionsAsync();
    Task<IEnumerable<Legacy>> GetAllLegaciesAsync();
    Task<IEnumerable<RangeType>> GetAllRangeTypesAsync();
    Task<IEnumerable<Region>> GetAllRegionsAsync();
    Task<IEnumerable<Resource>> GetAllResourcesAsync();
  }
}

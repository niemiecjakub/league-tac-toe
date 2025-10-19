using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IResourceRepository
  {
    Task<IEnumerable<Resource>> GetAllAsync();
  }
}

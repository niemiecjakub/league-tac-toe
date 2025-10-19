using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface ILegacyRepository
  {
    Task<IEnumerable<Legacy>> GetAllAsync();
  }
}

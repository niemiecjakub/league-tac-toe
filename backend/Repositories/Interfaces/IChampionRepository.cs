using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Filters;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IChampionRepository
  {
    Task<IEnumerable<Champion>> GetAllAsync(ChampionFilter filter);
    Task<Champion?> GetByIdAsync(int id);
  }
}

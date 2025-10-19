using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IPositionRepository
  {
    Task<IEnumerable<Position>> GetAllAsync();
  }
}

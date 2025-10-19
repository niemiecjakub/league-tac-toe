using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IGameRepository
  {
    Task<Game> CreateAsync(Game game);
    Task<Game?> GetByRoomGuidAsync(Guid roomGuid);
    Task UpdateAsync(Game game);
  }
}

using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Enums;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IGameRepository
  {
    Task<Game> CreateAsync(Game game);
    Task<Game?> GetByRoomGuidAsync(Guid roomGuid);
    Task UpdateAsync(Game game);
    Task<Dictionary<GameStateType, int>> GetGamesByStateCount();
  }
}

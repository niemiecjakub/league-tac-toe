using LeagueChampions.Models.Entity;

namespace LeagueChampions.Service.Interfaces
{
  public interface IGameFactoryService
  {
    Task<Game> CreateNewGameAsync(Room room);
  }
}

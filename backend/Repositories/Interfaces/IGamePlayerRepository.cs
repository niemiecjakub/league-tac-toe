using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IGamePlayerRepository
  {
    public Task<GamePlayer> JoinRoomAsync(GamePlayer gamePlayer);
    public Task<ICollection<GamePlayer>> GetRoomPlayersAsync(Guid roomGuid);
  }
}

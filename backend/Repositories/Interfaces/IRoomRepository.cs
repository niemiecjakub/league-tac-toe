using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IRoomRepository
  {
    Task<Room> CreateRoomAsync(Room room);
    Task<Room?> GetOpenPublicRoom();
    Task<Room?> GetRoomByGuidAsync(Guid roomGuid);
    Task<IEnumerable<Room>> GetRoomsAsync();
    Task UpdateAsync(Room room);
  }
}

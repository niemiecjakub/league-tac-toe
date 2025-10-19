using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Enums;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class RoomRepository : IRoomRepository
  {
    private readonly AppDbContext _context;

    public RoomRepository(AppDbContext context)
    {
      _context = context;
    }
    public async Task<Room> CreateRoomAsync(Room room)
    {
      _context.Room.Add(room);
      await _context.SaveChangesAsync();
      return room;
    }

    public async Task<Room?> GetOpenPublicRoom()
    {
      return await _context.Room
          .Include(r => r.Games)
          .Include(r => r.GamePlayers)
          .Where(r =>
              r.IsPublic &&
              r.Games.Count == 1 &&
              r.Games.Any(g => g.StatusId == GameStateType.Created) &&
              r.GamePlayers.Count == 1
          )
          .OrderBy(r => r.CreatedAt)
          .FirstOrDefaultAsync();
    }


    public async Task<Room?> GetRoomByGuidAsync(Guid roomGuid)
    {
      return await _context.Room
          .Include(r => r.Games)
          .Include(r => r.GamePlayers)
          .FirstOrDefaultAsync(r => r.RoomUID == roomGuid);
    }

    public async Task UpdateAsync(Room room)
    {
      _context.Room.Update(room);
      await _context.SaveChangesAsync();
    }
  }
}

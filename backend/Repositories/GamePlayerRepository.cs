using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class GamePlayerRepository : IGamePlayerRepository
  {
    private readonly AppDbContext _context;

    public GamePlayerRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<ICollection<GamePlayer>> GetRoomPlayersAsync(Guid roomGuid)
    {
      return await _context.GamePlayer.Where(g => g.RoomUID == roomGuid).ToListAsync();
    }

    public async Task<GamePlayer> JoinRoomAsync(GamePlayer gamePlayer)
    {
      _context.GamePlayer.Add(gamePlayer);
      await _context.SaveChangesAsync();
      return gamePlayer;
    }
  }
}

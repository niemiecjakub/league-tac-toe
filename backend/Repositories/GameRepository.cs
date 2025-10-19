using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class GameRepository : IGameRepository
  {
    private readonly AppDbContext _context;

    public GameRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<Game> CreateAsync(Game game)
    {
      _context.Game.Add(game);
      await _context.SaveChangesAsync();
      return game;
    }

    public async Task<Game?> GetByRoomGuidAsync(Guid roomGuid)
    {
      return await _context.Game.OrderByDescending(g => g.CreatedAt).FirstOrDefaultAsync(g => g.RoomUID == roomGuid);
    }

    public async Task UpdateAsync(Game game)
    {
      _context.Game.Update(game);
      await _context.SaveChangesAsync();
    }
  }
}

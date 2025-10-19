using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class PositionRepository :IPositionRepository
  {
    private readonly AppDbContext _context;

    public PositionRepository(AppDbContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<Position>> GetAllAsync()
    {
      return await _context.Position.ToListAsync();
    }
  }
}

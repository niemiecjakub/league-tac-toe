using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class LegacyRepository : ILegacyRepository
  {
    private readonly AppDbContext _context;

    public LegacyRepository(AppDbContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<Legacy>> GetAllAsync()
    {
      return await _context.Legacy.ToListAsync();
    }
  }
}

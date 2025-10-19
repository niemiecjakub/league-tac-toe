using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class RangeTypeRepository : IRangeTypeRepository
  {
    private readonly AppDbContext _context;

    public RangeTypeRepository(AppDbContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<RangeType>> GetAllAsync()
    {
      return await _context.RangeType.ToListAsync();
    }
  }
}

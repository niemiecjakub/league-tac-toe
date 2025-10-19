using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class RegionRepository : IRegionRepository
  {
    private readonly AppDbContext _context;

    public RegionRepository(AppDbContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<Region>> GetAllAsync()
    {
      return await _context.Region.ToListAsync();
    }
  }
}

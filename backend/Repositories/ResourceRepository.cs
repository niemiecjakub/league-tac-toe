using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class ResourceRepository : IResourceRepository
  {
    private readonly AppDbContext _context;

    public ResourceRepository(AppDbContext context)
    {
      _context = context;
    }
    public async Task<IEnumerable<Resource>> GetAllAsync()
    {
      return await _context.Resource.ToListAsync();
    }
  }
}

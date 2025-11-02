using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Entity.Esport;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class MetafilterRepository : IMetafilterRepository
  {
    private readonly IDbContextFactory<AppDbContext> _contextFactory;

    public MetafilterRepository(IDbContextFactory<AppDbContext> contextFactory)
    {
      _contextFactory = contextFactory;
    }

    public async Task<IEnumerable<Position>> GetAllPositionsAsync()
    {
      using var context = _contextFactory.CreateDbContext();
      return await context.Position.ToListAsync();
    }

    public async Task<IEnumerable<Legacy>> GetAllLegaciesAsync()
    {
      using var context = _contextFactory.CreateDbContext();
      return await context.Legacy.ToListAsync();
    }

    public async Task<IEnumerable<RangeType>> GetAllRangeTypesAsync()
    {
      using var context = _contextFactory.CreateDbContext();
      return await context.RangeType.ToListAsync();
    }

    public async Task<IEnumerable<Region>> GetAllRegionsAsync()
    {
      using var context = _contextFactory.CreateDbContext();
      return await context.Region.ToListAsync();
    }

    public async Task<IEnumerable<Resource>> GetAllResourcesAsync()
    {
      using var context = _contextFactory.CreateDbContext();
      return await context.Resource.ToListAsync();
    }

    public async Task<IEnumerable<EsportPlayer>> GetEsportPlayerPickFiltersAsync()
    {
      using var context = _contextFactory.CreateDbContext();
      return await context.EsportPlayerPick
        .Select(p => p.Player)
        .ToHashSetAsync();
    }
  }
}

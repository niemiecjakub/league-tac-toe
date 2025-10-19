﻿using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Filters;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class ChampionRepository : IChampionRepository
  {
    private readonly AppDbContext _context;

    public ChampionRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<IEnumerable<Champion>> GetAllAsync(ChampionFilter filter)
    {
      IQueryable<Champion> query = _context.Champion
          .Include(c => c.ChampionRegion)
              .ThenInclude(cr => cr.Region)
          .Include(c => c.ChampionPosition)
              .ThenInclude(cp => cp.Position)
          .Include(c => c.ChampionResource)
              .ThenInclude(cr => cr.Resource)
          .Include(c => c.ChampionLegacy)
              .ThenInclude(cl => cl.Legacy)
          .Include(c => c.ChampionRangeType)
              .ThenInclude(cr => cr.RangeType);

      var regionIds = filter.Region?.Select(r => (int)r).ToList();
      if (regionIds?.Count > 0)
      {
        query = query.Where(c => regionIds.All(rid =>
            c.ChampionRegion.Any(cr => cr.Region.Id == rid)));
      }

      var resourceIds = filter.Resource?.Select(r => (int)r).ToList();
      if (resourceIds?.Count > 0)
      {
        query = query.Where(c => resourceIds.All(rid =>
            c.ChampionResource.Any(cr => cr.Resource.Id == rid)));
      }

      var positionIds = filter.Position?.Select(p => (int)p).ToList();
      if (positionIds?.Count > 0)
      {
        query = query.Where(c => positionIds.All(pid =>
            c.ChampionPosition.Any(cp => cp.Position.Id == pid)));
      }

      var legacyIds = filter.Legacy?.Select(l => (int)l).ToList();
      if (legacyIds?.Count > 0)
      {
        query = query.Where(c => legacyIds.All(lid =>
            c.ChampionLegacy.Any(cl => cl.Legacy.Id == lid)));
      }

      var rangeTypeIds = filter.RangeType?.Select(rt => (int)rt).ToList();
      if (rangeTypeIds?.Count > 0)
      {
        query = query.Where(c => rangeTypeIds.All(rtid =>
            c.ChampionRangeType.Any(cr => cr.RangeType.Id == rtid)));
      }

      return await query.ToListAsync();
    }


    public async Task<Champion?> GetByIdAsync(int id)
    {
      return await _context.Champion
        .Include(c => c.ChampionRegion)
          .ThenInclude(cr => cr.Region)
        .Include(c => c.ChampionPosition)
          .ThenInclude(cp => cp.Position)
        .Include(c => c.ChampionResource)
          .ThenInclude(cr => cr.Resource)
        .Include(c => c.ChampionLegacy)
          .ThenInclude(cl => cl.Legacy)
        .Include(c => c.ChampionRangeType)
          .ThenInclude(cr => cr.RangeType)
        .FirstOrDefaultAsync(champion => champion.ChampionId == id);
    }
  }
}

using LeagueChampions.Exceptions;
using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Filters;
using LeagueChampions.Models.Mapper;
using LeagueChampions.Repositories.Interfaces;
using LeagueChampions.Service.Interfaces;
using Microsoft.Extensions.Caching.Memory;

namespace LeagueChampions.Services
{
  public class ChampionService : IChampionService
  {
    private readonly IChampionRepository _championRepository;
    private readonly IMemoryCache _cache;
    public ChampionService(IChampionRepository championRepository, IMemoryCache cache)
    {
      _championRepository = championRepository;
      _cache = cache;
    }

    public async Task<IEnumerable<ChampionDto>> GetAllChampionsAsync(ChampionFilter filter)
    {
      var champions = await _championRepository.GetAllAsync(filter);
      return champions.Select(c => c.ToChampionDto());
    }

    public async Task<ChampionDto> GetChampionByIdAsync(int id)
    {
      var cacheKey = $"champion_{id}";

      if (!_cache.TryGetValue(cacheKey, out ChampionDto? championDto))
      {
        var champion = await _championRepository.GetByIdAsync(id);
        championDto = champion?.ToChampionDto();

        if (championDto != null)
        {
          var cacheOptions = new MemoryCacheEntryOptions()
            .SetPriority(CacheItemPriority.NeverRemove);

          _cache.Set(cacheKey, championDto, cacheOptions);
        }
      }

      return championDto ?? throw new ChampionNotFoundException(id);
    }
  }
}

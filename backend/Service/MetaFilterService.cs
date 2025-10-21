using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Mapper;
using LeagueChampions.Repositories.Interfaces;
using LeagueChampions.Service.Interfaces;

namespace LeagueChampions.Services
{
  public class MetaFilterService : IMetaFilterService
  {
    private readonly IMetafilterRepository _metafilterRepository;


    public MetaFilterService(IMetafilterRepository metafilterRepository)
    {
      _metafilterRepository = metafilterRepository;
    }

    public async Task<ChampionMetaFiltersDto> GetMetaFiltersAsync()
    {
      var legacyTask = _metafilterRepository.GetAllLegaciesAsync();
      var positionTask = _metafilterRepository.GetAllPositionsAsync();
      var rangeTypeTask = _metafilterRepository.GetAllRangeTypesAsync();
      var regionTask = _metafilterRepository.GetAllRegionsAsync();
      var resourceTask = _metafilterRepository.GetAllResourcesAsync();

      await Task.WhenAll(legacyTask, positionTask, rangeTypeTask, regionTask, resourceTask);

      return new ChampionMetaFiltersDto
      {
        Filters = new List<MetaFilterDto>
        {
          new MetaFilterDto{
            Name = "Legacy",
            Value = "legacies",
            Options = legacyTask.Result.ToMetaFilterOptionDtos()
          },
          new MetaFilterDto{
            Name = "Position",
            Value = "positions",
            Options = positionTask.Result.ToMetaFilterOptionDtos()
          },
          new MetaFilterDto{
            Name = "Range Type",
            Value = "rangeTypes",
            Options = rangeTypeTask.Result.ToMetaFilterOptionDtos()
          },
          new MetaFilterDto{
            Name = "Region",
            Value = "region",
            Options = regionTask.Result.ToMetaFilterOptionDtos()
          },
          new MetaFilterDto{
            Name = "Resources",
            Value = "resource",
            Options = resourceTask.Result.ToMetaFilterOptionDtos()
          }
        }
      };
    }
  }
}

using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Mapper;
using LeagueChampions.Repositories.Interfaces;
using LeagueChampions.Service.Interfaces;

namespace LeagueChampions.Services
{
  public class MetaFilterService : IMetaFilterService
  {
    private readonly ILegacyRepository _legacyRepository;
    private readonly IPositionRepository _positionRepository;
    private readonly IRangeTypeRepository _rangeTypeRepository;
    private readonly IRegionRepository _regionRepository;
    private readonly IResourceRepository _resourceRepository;

    public MetaFilterService(
        ILegacyRepository legacyRepository,
        IPositionRepository positionRepository,
        IRangeTypeRepository rangeTypeRepository,
        IRegionRepository regionRepository,
        IResourceRepository resourceRepository)
    {
      _legacyRepository = legacyRepository;
      _positionRepository = positionRepository;
      _rangeTypeRepository = rangeTypeRepository;
      _regionRepository = regionRepository;
      _resourceRepository = resourceRepository;
    }

    public async Task<ChampionMetaFiltersDto> GetMetaFiltersAsync()
    {
      var legacyTask = _legacyRepository.GetAllAsync();
      var positionTask = _positionRepository.GetAllAsync();
      var rangeTypeTask = _rangeTypeRepository.GetAllAsync();
      var regionTask = _regionRepository.GetAllAsync();
      var resourceTask = _resourceRepository.GetAllAsync();

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

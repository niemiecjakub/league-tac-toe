using LeagueChampions.Models.Dto;

namespace LeagueChampions.Service.Interfaces
{
  public interface IMetaFilterService
  {
    Task<ChampionMetaFiltersDto> GetMetaFiltersAsync();
    Task<ChampionMetaFiltersDto> GetChampionStatisticsFiltersAsync(bool includeEsportCategories);
  }
}

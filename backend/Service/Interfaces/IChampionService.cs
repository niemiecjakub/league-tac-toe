using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Filters;

namespace LeagueChampions.Service.Interfaces
{
  public interface IChampionService
  {
    Task<IEnumerable<ChampionDto>> GetAllChampionsAsync(ChampionFilter filter);
    Task<ChampionDto> GetChampionByIdAsync(int id);
  }
}

using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Entity;

namespace LeagueChampions.Models.Mapper
{
  public static class ChampionMapper
  {
    public static ChampionDto ToChampionDto(this Champion champion)
    {
      return new ChampionDto
      {
        Id = champion.ChampionId,
        Name = champion.Name,
        Title = champion.Title,
        ImageUrl = champion.ImageUrl,
        Region = champion.ChampionRegion.FirstOrDefault()?.Region?.Name ?? string.Empty,
        Resource = champion.ChampionResource.FirstOrDefault()?.Resource?.Name ?? string.Empty,
        Positions = champion.ChampionPosition.Select(position => position.Position.Name).ToList(),
        Legacies = champion.ChampionLegacy.Select(legacy => legacy.Legacy.Name).ToList(),
        RangeTypes = champion.ChampionRangeType.Select(rangeType => rangeType.RangeType.Name).ToList()
      };
    }
  }
}

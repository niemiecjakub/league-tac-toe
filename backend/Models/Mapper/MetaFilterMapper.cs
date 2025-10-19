using LeagueChampions.Models.Abstraction;
using LeagueChampions.Models.Dto;

namespace LeagueChampions.Models.Mapper
{
  public static class MetaFilterMapper
  {
    public static MetaFilterOptionDto ToMetaFilterOptionDto(this MetaFilterItem metaItem)
    {
      return new MetaFilterOptionDto
      {
        Id = metaItem.Id,
        Name = metaItem.Name,
      };
    }

    public static List<MetaFilterOptionDto> ToMetaFilterOptionDtos(this IEnumerable<MetaFilterItem> items)
    {
      return items.Select(i => i.ToMetaFilterOptionDto()).ToList();
    }

    public static MetaFilterDto ToMetaFilterDto(this IEnumerable<MetaFilterItem> items, string name, string value)
    {
      return new MetaFilterDto
      {
        Name = name,
        Value = value,
        Options = items.ToMetaFilterOptionDtos(),
      };
    }
  }
}

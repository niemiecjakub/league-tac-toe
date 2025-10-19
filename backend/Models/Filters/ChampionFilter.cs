using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Enums;
using LeagueChampions.Models.ValueObjects;

namespace LeagueChampions.Models.Filters
{
  public class ChampionFilter
  {
    public ICollection<RegionType>? Region { get; set; }
    public ICollection<ResourceType>? Resource { get; set; }
    public ICollection<PositionType>? Position { get; set; }
    public ICollection<LegacyType>? Legacy { get; set; }
    public ICollection<RangeTypeType>? RangeType { get; set; }

    public static ChampionFilter Create(IEnumerable<CategoryField> categoryFields)
    {
      var filter = new ChampionFilter();

      foreach (CategoryField field in categoryFields)
      {
        switch (field.Category.ToLower())
        {
          case "position":
            if (Enum.TryParse(field.Name, true, out PositionType pos))
            {
              filter.Position ??= new List<PositionType>();
              filter.Position.Add(pos);
            }
            break;

          case "legacy":
            if (Enum.TryParse(field.Name, true, out LegacyType legacy))
            {
              filter.Legacy ??= new List<LegacyType>();
              filter.Legacy.Add(legacy);
            }
            break;

          case "range type":
            if (Enum.TryParse(field.Name, true, out RangeTypeType range))
            {
              filter.RangeType ??= new List<RangeTypeType>();
              filter.RangeType.Add(range);
            }
            break;

          case "region":
            if (Enum.TryParse(field.Name, true, out RegionType region))
            {
              filter.Region ??= new List<RegionType>();
              filter.Region.Add(region);
            }
            break;

          case "resources":
            if (Enum.TryParse(field.Name, true, out ResourceType resource))
            {
              filter.Resource ??= new List<ResourceType>();
              filter.Resource.Add(resource);
            }
            break;
        }
      }

      return filter;
    }

  }
}

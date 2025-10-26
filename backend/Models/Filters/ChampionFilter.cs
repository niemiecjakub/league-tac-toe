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

    public string GetFilterSummary()
    {
      var parts = new List<string>();

      if (Region != null && Region.Count > 0)
        parts.Add($"Region: {string.Join(", ", Region)}");

      if (Resource != null && Resource.Count > 0)
        parts.Add($"Resource: {string.Join(", ", Resource)}");

      if (Position != null && Position.Count > 0)
        parts.Add($"Position: {string.Join(", ", Position)}");

      if (Legacy != null && Legacy.Count > 0)
        parts.Add($"Legacy: {string.Join(", ", Legacy)}");

      if (RangeType != null && RangeType.Count > 0)
        parts.Add($"RangeType: {string.Join(", ", RangeType)}");

      return string.Join(" | ", parts);
    }

  }
}

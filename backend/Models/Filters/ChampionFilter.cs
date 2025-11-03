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
    public ICollection<string>? PlayerTopPick { get; set; }
    public ICollection<Tuple<RatioType, double>>? PickRatio { get; set; }
    public ICollection<Tuple<RatioType, double>>? WinRatio { get; set; }
    public ICollection<Tuple<RatioType, double>>? BanRatio { get; set; }

    public static ChampionFilter Create(IEnumerable<CategoryField> categoryFields)
    {
      var filter = new ChampionFilter();

      foreach (CategoryField field in categoryFields)
      {
        switch (field.CategoryGroupName.ToLower())
        {
          case "position":
            if (Enum.TryParse(field.OptionName, true, out PositionType pos))
            {
              filter.Position ??= new List<PositionType>();
              filter.Position.Add(pos);
            }
            break;

          case "legacy":
            if (Enum.TryParse(field.OptionName, true, out LegacyType legacy))
            {
              filter.Legacy ??= new List<LegacyType>();
              filter.Legacy.Add(legacy);
            }
            break;

          case "range type":
            if (Enum.TryParse(field.OptionName, true, out RangeTypeType range))
            {
              filter.RangeType ??= new List<RangeTypeType>();
              filter.RangeType.Add(range);
            }
            break;

          case "region":
            if (Enum.TryParse(field.OptionName, true, out RegionType region))
            {
              filter.Region ??= new List<RegionType>();
              filter.Region.Add(region);
            }
            break;

          case "resources":
            if (Enum.TryParse(field.OptionName, true, out ResourceType resource))
            {
              filter.Resource ??= new List<ResourceType>();
              filter.Resource.Add(resource);
            }
            break;

          case "player top pick":
            filter.PlayerTopPick ??= new List<string>();
            filter.PlayerTopPick.Add(field.OptionName);
            break;

          case "pick ratio":
            filter.PickRatio ??= new List<Tuple<RatioType, double>>();
            Enum.TryParse<RatioType>(field.OptionName, out RatioType pickResult);
            filter.PickRatio.Add(new(pickResult, (field as CategoryFieldTreshold)?.Treshold ?? 50));
            break;

          case "win ratio":
            filter.WinRatio ??= new List<Tuple<RatioType, double>>();
            Enum.TryParse<RatioType>(field.OptionName, out RatioType winResult);
            filter.WinRatio.Add(new(winResult, (field as CategoryFieldTreshold)?.Treshold ?? 5));
            break;

          case "ban ratio":
            filter.BanRatio ??= new List<Tuple<RatioType, double>>();
            Enum.TryParse<RatioType>(field.OptionName, out RatioType banResult);
            filter.BanRatio.Add(new(banResult, (field as CategoryFieldTreshold)?.Treshold ?? 5));
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

      if (PlayerTopPick != null && PlayerTopPick.Count > 0)
        parts.Add($"PlayerTopPick: {string.Join(", ", PlayerTopPick)}");

      if (PickRatio != null && PickRatio.Count > 0)
        parts.Add($"PickRatio: {string.Join(", ", PickRatio)}");

      if (WinRatio != null && WinRatio.Count > 0)
        parts.Add($"WinRatio: {string.Join(", ", WinRatio)}");

      if (BanRatio != null && BanRatio.Count > 0)
        parts.Add($"BanRatio: {string.Join(", ", BanRatio)}");

      return string.Join(" | ", parts);
    }

  }
}

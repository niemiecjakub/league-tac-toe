namespace LeagueChampions.Models.ValueObjects
{
  public class CategoryField
  {
    public string CategoryGroupName { get; init; } = null!;
    public string OptionName { get; init; } = null!;
    public string ResourceKey { get; }
    public string? DisplayName { get; }

    public CategoryField(string categoryGroupName, string optionName, string? displayName = null)
    {
      CategoryGroupName = categoryGroupName;
      OptionName = optionName;
      DisplayName = displayName;
      ResourceKey = $"{categoryGroupName.ToLowerInvariant().Replace(" ", "")}/{optionName.ToLowerInvariant().Replace(" ", "")}";
    }

    public string GetCategorySummary()
    {
      return $"{CategoryGroupName}: {OptionName}";
    }
  }
}

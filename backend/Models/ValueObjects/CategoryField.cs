namespace LeagueChampions.Models.ValueObjects
{
  public class CategoryField
  {
    public string CategoryGroupName { get; init; } = null!;
    public string OptionName { get; init; } = null!;
    public string ResourceKey { get; }
    public string? DisplayName { get; }

    public CategoryField(string categoryGroup, string optionName, string? displayName = null)
    {
      CategoryGroupName = categoryGroup;
      OptionName = optionName;
      DisplayName = displayName;
      ResourceKey = $"{categoryGroup.ToLowerInvariant().Replace(" ", "")}/{optionName.ToLowerInvariant().Replace(" ", "")}";
    }

    public string GetCategorySummary()
    {
      return $"{CategoryGroupName}: {OptionName}";
    }
  }
}

namespace LeagueChampions.Models.ValueObjects
{
  public class CategoryField
  {
    public string Category { get; init; } = null!;
    public string Name { get; init; } = null!;
    public string ResourceKey { get; }

    public CategoryField(string category, string name)
    {
      Category = category;
      Name = name;
      ResourceKey = $"{category.ToLowerInvariant().Replace(" ", "")}/{name.ToLowerInvariant().Replace(" ", "")}";
    }
  }
}

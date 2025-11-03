namespace LeagueChampions.Models.ValueObjects
{
  public class CategoryFieldTreshold : CategoryField
  {
    public CategoryFieldTreshold(string categoryGroup, string optionName, double treshold, string? displayName = null) : base(categoryGroup, optionName, displayName)
    {
      Treshold = treshold;
    }

    public double Treshold { get; init; }
  }
}

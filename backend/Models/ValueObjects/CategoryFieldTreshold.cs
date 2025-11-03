namespace LeagueChampions.Models.ValueObjects
{
  public class CategoryFieldTreshold : CategoryField
  {
    public CategoryFieldTreshold(string categoryGroupName, string optionName, double treshold, string? displayName = null) : base(categoryGroupName, optionName, displayName)
    {
      Treshold = treshold;
    }

    public double Treshold { get; init; }
  }
}

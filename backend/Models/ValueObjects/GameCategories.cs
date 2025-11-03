using LeagueChampions.Utils;
using Newtonsoft.Json;

namespace LeagueChampions.Models.ValueObjects
{
  public class GameCategories
  {
    public List<CategoryField> Vertical { get; init; } = new();
    public List<CategoryField> Horizontal { get; init; } = new();


    public IEnumerable<CategoryField> GetCategoryFields(int fieldId)
    {
      var (row, col) = FieldUtils.GetRowColFromFieldId(fieldId);
      return new List<CategoryField>()
      {
        Horizontal.ElementAt(col),
        Vertical.ElementAt(row)
      };
    }

    [JsonIgnore]
    public List<CategoryField> HorizontalSorted => Horizontal.OrderBy(c => c.GetCategorySummary()).ToList();

    [JsonIgnore]
    public List<CategoryField> VerticallSorted => Vertical.OrderBy(c => c.GetCategorySummary()).ToList();

    [JsonIgnore]
    public List<CategoryField> AllSorted => VerticallSorted.Concat(HorizontalSorted).ToList();

    public string GetAllSummary()
    {
      return string.Join(" | ", AllSorted.Select(c => c.GetCategorySummary()));
    }

    public string GetVerticalSummary()
    {
      return string.Join(" | ", VerticallSorted.Select(c => c.GetCategorySummary()));
    }
    public string GetHorizontalSummary()
    {
      return string.Join(" | ", HorizontalSorted.Select(c => c.GetCategorySummary()));
    }
  }
}

using LeagueChampions.Utils;

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
  }
}

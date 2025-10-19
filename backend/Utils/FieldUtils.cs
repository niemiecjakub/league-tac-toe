namespace LeagueChampions.Utils
{
  public static class FieldUtils
  {
    public static (int row, int col) GetRowColFromFieldId(int fieldId)
    {
      int row = (fieldId - 1) / 3;
      int col = (fieldId - 1) % 3;
      return (row, col);
    }
  }
}

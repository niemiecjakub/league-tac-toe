using LeagueChampions.Models.Enums;

namespace LeagueChampions.Models.ValueObjects
{
  public class BoardField
  {
    public FieldValue? Value;
    public ICollection<FieldValue> History { get; set; } = new List<FieldValue>();

    public MoveResult SetFieldValue(FieldValue newValue)
    {
      Value = newValue;
      History.Add(newValue);
      return History.Count > 1 ? MoveResult.STEAL : MoveResult.SCORE;
    }
    public bool IsMovePossible(string championName, bool canUserSteal)
    {
      if (canUserSteal)
      {
        if (Value?.championName == championName || History.Any(f => f.championName == championName))
        {
          return false;
        }
      }
      else
      {
        if (Value != null)
        {
          return false;
        }
      }

      return true;
    }

    public PlayerType? GetFieldOwner() => Value?.playerType;
  }

  public record FieldValue(string championName, PlayerType playerType);
}

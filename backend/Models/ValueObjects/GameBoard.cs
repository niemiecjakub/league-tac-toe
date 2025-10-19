using LeagueChampions.Models.Enums;
using LeagueChampions.Utils;
using Newtonsoft.Json;

namespace LeagueChampions.Models.ValueObjects
{
  public class GameBoard
  {
    private readonly BoardField[][] _board;

    public static BoardField[][] InitializeEmpty()
    {
      var board = new BoardField[3][];
      for (int i = 0; i < 3; i++)
      {
        board[i] = new BoardField[3];
        for (int j = 0; j < 3; j++)
        {
          board[i][j] = new BoardField();
        }
      }
      return board;
    }

    public GameBoard(BoardField[][] board)
    {
      _board = board;
    }

    public string Serialize() => JsonConvert.SerializeObject(_board);

    public bool IsValidMove(int fieldId, string championName, bool canUserSteal)
    {
      return GetBoardField(fieldId).IsMovePossible(championName, canUserSteal);
    }

    public MoveResult MakeMove(int fieldId, string championName, PlayerType playerType)
    {
      return GetBoardField(fieldId).SetFieldValue(new FieldValue(championName, playerType));
    }

    public bool CheckWin(PlayerType playerType)
    {
      for (int i = 0; i < 3; i++)
      {
        if (GetBoardField(i, 0).GetFieldOwner() == playerType && GetBoardField(i, 1).GetFieldOwner() == playerType && GetBoardField(i, 2).GetFieldOwner() == playerType) return true;
        if (GetBoardField(0, i).GetFieldOwner() == playerType && GetBoardField(1, i).GetFieldOwner() == playerType && GetBoardField(2, i).GetFieldOwner() == playerType) return true;
      }
      if (GetBoardField(0, 0).GetFieldOwner() == playerType && GetBoardField(1, 1).GetFieldOwner() == playerType && GetBoardField(2, 2).GetFieldOwner() == playerType) return true;
      if (GetBoardField(0, 2).GetFieldOwner() == playerType && GetBoardField(1, 1).GetFieldOwner() == playerType && GetBoardField(2, 0).GetFieldOwner() == playerType) return true;

      return false;
    }

    public bool IsDraw()
    {
      foreach (BoardField[] row in _board)
        foreach (BoardField cell in row)
          if (cell.Value == null)
            return false;
      return true;
    }

    #region Private

    private BoardField GetBoardField(int fieldId)
    {
      var (row, col) = FieldUtils.GetRowColFromFieldId(fieldId);
      return GetBoardField(row, col);
    }

    private BoardField GetBoardField(int row, int col)
    {
      return _board[row][col];
    }
    #endregion
  }
}

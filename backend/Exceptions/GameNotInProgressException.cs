namespace LeagueChampions.Exceptions
{
  public class GameNotInProgressException : Exception
  {
    public GameNotInProgressException() : base("Game is not in progress.") { }
  }
}

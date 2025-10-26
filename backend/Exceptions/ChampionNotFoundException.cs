namespace LeagueChampions.Exceptions
{
  public class ChampionNotFoundException : Exception
  {
    public int ChampionId { get; }
    public ChampionNotFoundException(int championId) : base($"Champion with ID: {championId} was not found")
    {
      ChampionId = championId;
    }
  }
}

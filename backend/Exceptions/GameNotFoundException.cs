namespace LeagueChampions.Exceptions
{
  public class GameNotFoundException : Exception
  {
    public Guid RoomGuid { get; }
    public GameNotFoundException(Guid roomGuid) : base($"Game not found for Room {roomGuid}.")
    {
      RoomGuid = roomGuid;
    }
  }
}

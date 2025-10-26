namespace LeagueChampions.Exceptions
{
  public class RoomNotFoundException : Exception
  {
    public Guid RoomGuid { get; }
    public RoomNotFoundException(Guid roomGuid) : base($"Room {roomGuid} was not found.")
    {
      RoomGuid = roomGuid;
    }
  }
}

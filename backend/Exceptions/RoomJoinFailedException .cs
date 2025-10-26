namespace LeagueChampions.Exceptions
{
  public class RoomJoinFailedException : Exception
  {
    public Guid UserGuid { get; }
    public Guid RoomGuid { get; }
    public RoomJoinFailedException(string message, Guid userGuid, Guid roomGuid) : base(message)
    {
      UserGuid = userGuid;
      RoomGuid = roomGuid;
    }
  }
}

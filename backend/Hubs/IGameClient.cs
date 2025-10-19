namespace LeagueChampions.Hubs
{
  public interface IGameClient
  {
    Task PlayerJoined();
    Task PlayerLeft();
    Task TurnSwitch();
    Task DrawRequested();
    Task NextGameStarted();
    Task Countdown(int time);
    Task TurnTimeTick(int turnTimeLeft);
    Task LeaveRoom(Guid roomGuid);
  }
}

namespace LeagueChampions.Service.Interfaces
{
  public interface ICountdownService
  {
    Task CountdownNextRound(Guid roomGuid);
    Task StartTurnCountdownAsync(Guid roomGuid, int? turnTime);
    Task CancelTurnCountdown(Guid roomGuid);
    Task ResetTurnCountdownAsync(Guid roomGuid, int? turnTime);
  }
}

using LeagueChampions.Hubs;
using LeagueChampions.Service.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace LeagueChampions.Service
{
  public class CountdownService : ICountdownService
  {
    private const int _timeTillNextRound = 3;
    private readonly IServiceProvider _serviceProvider;
    private readonly IHubContext<GameHub, IGameClient> _hubContext;
    private readonly ConcurrentDictionary<Guid, TimerData> _timers = new();

    public CountdownService(IServiceProvider serviceProvider, IHubContext<GameHub, IGameClient> hubContext)
    {
      _serviceProvider = serviceProvider;
      _hubContext = hubContext;
    }

    public async Task CountdownNextRound(Guid roomGuid)
    {
      using var scope = _serviceProvider.CreateScope();
      var gameService = scope.ServiceProvider.GetRequiredService<IGameService>();
      var roomDto = await gameService.CreateNextRoundAsync(roomGuid);

      string roomGroupName = roomGuid.ToString();
      for (int i = _timeTillNextRound; i >= 0; i--)
      {
        if (i > 0) await Task.Delay(TimeSpan.FromSeconds(1));
      }

      await _hubContext.Clients.Group(roomGroupName).NextGameStarted();
      _ = ResetTurnCountdownAsync(roomGuid, roomDto.TurnTime);
    }

    public Task StartTurnCountdownAsync(Guid roomGuid, int? turnTime)
    {
      if (!turnTime.HasValue) return Task.CompletedTask;

      var cts = new CancellationTokenSource();
      string groupName = roomGuid.ToString();

      Task timerTask = Task.Run(async () =>
      {
        try
        {
          while (true)
          {
            cts.Token.ThrowIfCancellationRequested();

            for (int secondsLeft = turnTime.Value; secondsLeft >= 0; secondsLeft--)
            {
              cts.Token.ThrowIfCancellationRequested();
              await _hubContext.Clients.Group(groupName).TurnTimeTick(secondsLeft);
              await Task.Delay(1000, cts.Token);
            }

            cts.Token.ThrowIfCancellationRequested();

            using var scope = _serviceProvider.CreateScope();
            var gameService = scope.ServiceProvider.GetRequiredService<IGameService>();
            await gameService.SkipCurrentPlayerMoveAsync(roomGuid);
            await _hubContext.Clients.Group(groupName).TurnSwitch();
          }
        }
        catch (TaskCanceledException) { }
        finally
        {
          _timers.TryRemove(roomGuid, out _);
        }
      }, cts.Token);

      _timers[roomGuid] = new TimerData(cts, timerTask);
      return timerTask;
    }

    public async Task ResetTurnCountdownAsync(Guid roomGuid, int? turnTime)
    {
      await CancelTurnCountdown(roomGuid);
      _ = StartTurnCountdownAsync(roomGuid, turnTime);
    }

    public async Task CancelTurnCountdown(Guid roomGuid)
    {
      if (_timers.TryRemove(roomGuid, out var timerData))
      {
        await timerData.Cts.CancelAsync();

        try
        {
          await timerData.TimerTask;
        }
        catch (TaskCanceledException) { }
      }
    }
  }

  public record TimerData(CancellationTokenSource Cts, Task TimerTask);
}
using LeagueChampions.Service.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace LeagueChampions.Hubs
{
  public class GameHub : Hub<IGameClient>
  {
    private readonly IGameService _gameService;
    private readonly ILogger<GameHub> _logger;
    public GameHub(ILogger<GameHub> logger ,IGameService gameService)
    {
      _gameService = gameService;
      _logger = logger;
    }

    public async Task JoinRoom(string roomId)
    {
      await Groups.AddToGroupAsync(Context.ConnectionId, roomId);
      await Clients.OthersInGroup(roomId).PlayerJoined();
    }

    public async Task LeaveRoom(string roomId)
    {
      await Groups.RemoveFromGroupAsync(Context.ConnectionId, roomId);
      await Clients.OthersInGroup(roomId).PlayerLeft();
      await _gameService.CloseRoomAsync(Guid.Parse(roomId));
      _logger.LogInformation($"Closing room {roomId}. User {Context.ConnectionId} has left.");
    }
  }
}

using LeagueChampions.Service.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace LeagueChampions.Hubs
{
  public class GameHub : Hub<IGameClient>
  {
    private readonly IGameService _gameService;
    public GameHub(IGameService gameService)
    {
      _gameService = gameService;
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
    }
  }
}
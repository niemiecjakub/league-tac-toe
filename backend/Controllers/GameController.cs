using LeagueChampions.Hubs;
using LeagueChampions.Models.Enums;
using LeagueChampions.Models.ValueObjects;
using LeagueChampions.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.ComponentModel.DataAnnotations;

namespace LeagueChampions.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class GameController : ControllerBase
  {
    private ILogger<ChampionController> _logger;
    private IGameService _gameService;
    private ICountdownService _countdownService;

    public GameController(ILogger<ChampionController> logger, IGameService gameService, ICountdownService countdownService)
    {
      _logger = logger;
      _gameService = gameService;
      _countdownService = countdownService;
    }

    [HttpPost("CreateRoom")]
    public async Task<IActionResult> CreateRoom([FromQuery] RoomOptions options)
    {
      var room = await _gameService.CreateRoomAsync(options);
      return Ok(room);
    }

    [HttpPost("JoinRoom/{roomGuid}")]
    public async Task<IActionResult> JoinRoom(Guid roomGuid)
    {
      var roomDto = await _gameService.JoinRoomAsync(roomGuid, Request);

      if (roomDto.Game.GameStatus == GameStateType.InProgress)
      {
        _ = _countdownService.StartTurnCountdownAsync(roomGuid, roomDto.TurnTime);
      }
      return Ok(roomDto);
    }

    [HttpGet]
    public async Task<IActionResult> GetRoom(Guid roomGuid)
    {
      var roomDto = await _gameService.GetRoomAsync(roomGuid, Request);
      return Ok(roomDto);
    }

    [HttpGet("FindRandomOpponent")]
    public async Task<IActionResult> FindRandomOpponent()
    {
      var room = await _gameService.GetOrCreatePublicRoomAsync();
      return Ok(room);
    }

    [HttpPost("Move/{roomGuid}")]
    public async Task<IActionResult> MakeMove(Guid roomGuid, [FromQuery][Required] int fieldId, [FromQuery][Required] string championName, IHubContext<GameHub, IGameClient> context)
    {
      var room = await _gameService.MakeMoveAsync(roomGuid, fieldId, championName, Request);
      if (room == null) return NotFound();

      await context.Clients.Group(roomGuid.ToString()).TurnSwitch();

      if (room.Game.GameStatus == GameStateType.Finished)
      {
        _ = _countdownService.CancelTurnCountdown(roomGuid);
        _ = _countdownService.CountdownNextRound(roomGuid);
      }
      else if (room.Game.GameStatus == GameStateType.InProgress)
      {
        _ = _countdownService.ResetTurnCountdownAsync(roomGuid, room.TurnTime);
      }

      return Ok(room);
    }

    [HttpPost("Move/Skip/{roomGuid}")]
    public async Task<IActionResult> SkipTurn(Guid roomGuid, IHubContext<GameHub, IGameClient> context)
    {
      var room = await _gameService.SkipCurrentPlayerMoveAsync(roomGuid, Request);
      if (room == null) return NotFound();

      await context.Clients.Group(roomGuid.ToString()).TurnSwitch();
      _ = _countdownService.ResetTurnCountdownAsync(roomGuid, room.TurnTime);

      return Ok(room);
    }

    [HttpPost("Move/RequestDraw/{roomGuid}")]
    public async Task<IActionResult> RequestDraw(Guid roomGuid, IHubContext<GameHub, IGameClient> context)
    {
      var room = await _gameService.RequestDrawAsync(roomGuid, Request);
      if (room == null) return NotFound();

      await context.Clients.Group(roomGuid.ToString()).DrawRequested();
      _ = _countdownService.ResetTurnCountdownAsync(roomGuid, room.TurnTime);

      return Ok(room);
    }

    [HttpPost("Move/RespondDrawRequest/{roomGuid}")]
    public async Task<IActionResult> RespondDrawRequest(Guid roomGuid, IHubContext<GameHub, IGameClient> context)
    {
      var room = await _gameService.RespondDrawRequestAsync(roomGuid, Request);
      if (room == null) return NotFound();

      await context.Clients.Group(roomGuid.ToString()).TurnSwitch();

      _ = _countdownService.CancelTurnCountdown(roomGuid);
      _ = _countdownService.CountdownNextRound(roomGuid);
      return Ok(room);
    }

    [HttpGet("Rooms")]
    public async Task<IActionResult> GetRooms()
    {
      var rooms = await _gameService.GetRoomsAsync();
      return Ok(rooms);
    }
  }
}



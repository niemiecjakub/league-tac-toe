using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Enums;
using LeagueChampions.Models.Filters;
using LeagueChampions.Models.Mapper;
using LeagueChampions.Models.ValueObjects;
using LeagueChampions.Repositories.Interfaces;
using LeagueChampions.Service.Interfaces;

namespace LeagueChampions.Services
{
  public class GameService : IGameService
  {
    private readonly IGameRepository _gameRepository;
    private readonly IGamePlayerRepository _gamePlayerRepository;
    private readonly IRoomRepository _roomRepository;
    private readonly IChampionRepository _championRepository;
    private readonly IGameFactoryService _gameFactoryService;

    public GameService(IGameRepository gameRepository,
                       IGamePlayerRepository gamePlayerRepository,
                       IRoomRepository roomRepository,
                       IChampionRepository championRepository,
                       IGameFactoryService gameFactoryService
                       )
    {
      _gameRepository = gameRepository;
      _gamePlayerRepository = gamePlayerRepository;
      _roomRepository = roomRepository;
      _championRepository = championRepository;
      _gameFactoryService = gameFactoryService;
    }

    public async Task<RoomInfoDto> GetOrCreatePublicRoomAsync()
    {
      var publicRoom = await _roomRepository.GetOpenPublicRoom();
      if (publicRoom != null)
      {
        return publicRoom.ToRoomInfoDto();
      }

      return await CreateRoomAsync(RoomOptions.DefaultPublicRoomOptions);
    }

    public async Task<RoomInfoDto> CreateRoomAsync(RoomOptions options)
    {
      var room = Room.Create(options);
      await _gameFactoryService.CreateNewGameAsync(room);
      await _roomRepository.CreateRoomAsync(room);
      return room.ToRoomInfoDto();
    }

    public async Task<RoomInfoDto> CreateNextRoundAsync(Guid roomGuid)
    {
      Room? room = await _roomRepository.GetRoomByGuidAsync(roomGuid);
      if (room == null)
      {
        throw new Exception("Room not found");
      }
      var game = await _gameFactoryService.CreateNewGameAsync(room);
      game.Start();
      await _roomRepository.UpdateAsync(room);
      return room.ToRoomInfoDto();
    }

    public async Task<RoomDto> JoinRoomAsync(Guid roomGuid, HttpRequest request)
    {
      Room? room = await _roomRepository.GetRoomByGuidAsync(roomGuid);
      if (room == null)
      {
        throw new Exception("Room not found");
      }

      Guid userGuid = GetUserUidFromRequest(request);
      GamePlayer? player = room.Join(userGuid);
      await _roomRepository.UpdateAsync(room);

      Game? game = await _gameRepository.GetByRoomGuidAsync(roomGuid);
      if (game == null)
      {
        throw new Exception("Game not found");
      }

      return room.ToRoomDto(game, player);
    }

    public async Task<RoomDto> GetRoomAsync(Guid roomGuid, HttpRequest request)
    {
      Room? room = await _roomRepository.GetRoomByGuidAsync(roomGuid);
      if (room == null)
      {
        throw new Exception("Room not found");
      }

      Guid userGuid = GetUserUidFromRequest(request);
      GamePlayer? player = room.GetPlayer(userGuid);

      Game? game = await _gameRepository.GetByRoomGuidAsync(roomGuid);
      if (game == null)
      {
        throw new Exception("Game not found");
      }

      return room.ToRoomDto(game, player);
    }

    public async Task<RoomDto?> MakeMoveAsync(Guid roomGuid, int fieldId, string championName, HttpRequest request)
    {
      var room = await _roomRepository.GetRoomByGuidAsync(roomGuid);
      if (room == null) return null;

      var game = room.GetLastestGame();
      if (game == null || game.StatusId != GameStateType.InProgress)
        return null;


      var categoryFields = game.GetGameCategories().GetCategoryFields(fieldId);
      var possibleChampions = await _championRepository.GetAllAsync(ChampionFilter.Create(categoryFields));

      Guid currentPlayerGuid = GetUserUidFromRequest(request);
      var currentPlayer = room.GetPlayer(currentPlayerGuid);
      var moveResult = game.MakeMove(fieldId, championName, possibleChampions, currentPlayer);
      if (moveResult == MoveResult.STEAL)
      {
        currentPlayer.Steals--;
      }
      game.UpdateDate();

      await _gameRepository.UpdateAsync(game);
      return await GetRoomAsync(roomGuid, request);
    }

    public async Task SkipCurrentPlayerMoveAsync(Guid roomGuid)
    {
      await SkipMoveAsync(roomGuid);
    }

    public async Task<RoomDto?> SkipCurrentPlayerMoveAsync(Guid roomGuid, HttpRequest request)
    {
      var game = await SkipMoveAsync(roomGuid);
      if (game == null) return null;

      return await GetRoomAsync(roomGuid, request);
    }

    public async Task<RoomDto?> RequestDrawAsync(Guid roomGuid, HttpRequest request)
    {
      var game = await _gameRepository.GetByRoomGuidAsync(roomGuid);
      if (game == null) return null;

      game.RequestDraw();
      game.SetNextPlayerTurn();
      game.UpdateDate();

      await _gameRepository.UpdateAsync(game);
      return await GetRoomAsync(roomGuid, request);
    }

    public async Task<RoomDto?> RespondDrawRequestAsync(Guid roomGuid, HttpRequest request)
    {
      var game = await _gameRepository.GetByRoomGuidAsync(roomGuid);
      if (game == null) return null;

      game.SetDraw();
      game.UpdateDate();

      await _gameRepository.UpdateAsync(game);
      return await GetRoomAsync(roomGuid, request);
    }

    public async Task CloseRoomAsync(Guid roomGuid)
    {
      var game = await _gameRepository.GetByRoomGuidAsync(roomGuid);
      if (game == null)
      {
        return;
      }
      game.Close();
      game.UpdateDate();
      await _gameRepository.UpdateAsync(game);
    }

    public async Task<IEnumerable<RoomInfoDto>> GetRoomsAsync()
    {
      var rooms = await _roomRepository.GetRoomsAsync();
      return rooms.Select(r => r.ToRoomInfoDto());
    }

    private async Task<Game?> SkipMoveAsync(Guid roomGuid)
    {
      var game = await _gameRepository.GetByRoomGuidAsync(roomGuid);
      if (game == null)
      {
        return null;
      }

      game.SetNextPlayerTurn();
      game.CancelDrawRequest();
      game.UpdateDate();

      await _gameRepository.UpdateAsync(game);
      return game;
    }

    private Guid GetUserUidFromRequest(HttpRequest request)
    {
      var authHeader = request.Headers["Authorization"].ToString();
      if (authHeader.StartsWith("Bearer "))
      {
        return new Guid(authHeader.Substring("Bearer ".Length));
      }

      return new Guid(request.Query["access_token"].ToString());
    }
  }
}

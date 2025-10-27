using LeagueChampions.Exceptions;
using LeagueChampions.Metrics;
using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Enums;
using LeagueChampions.Models.Filters;
using LeagueChampions.Models.Mapper;
using LeagueChampions.Models.ValueObjects;
using LeagueChampions.Repositories.Interfaces;
using LeagueChampions.Service.Interfaces;
using LeagueChampions.Utils;

namespace LeagueChampions.Services
{
  public class GameService : IGameService
  {
    private readonly ILogger<GameService> _logger;
    private readonly IGameRepository _gameRepository;
    private readonly IRoomRepository _roomRepository;
    private readonly IChampionService _championService;
    private readonly IGameFactoryService _gameFactoryService;
    private readonly LeagueTacToeMetrics _metrics;

    public GameService(ILogger<GameService> logger,
                       IGameRepository gameRepository,
                       IGamePlayerRepository gamePlayerRepository,
                       IRoomRepository roomRepository,
                       IChampionService championService,
                       IGameFactoryService gameFactoryService,
                       LeagueTacToeMetrics metrics
                       )
    {
      _logger = logger;
      _gameRepository = gameRepository;
      _roomRepository = roomRepository;
      _championService = championService;
      _gameFactoryService = gameFactoryService;
      _metrics = metrics;
    }

    public async Task<RoomInfoDto> GetOrCreatePublicRoomAsync()
    {
      var publicRoom = await _roomRepository.GetOpenPublicRoom();
      if (publicRoom != null)
      {
        _metrics.AddPublicGameAttempt(PublicGameResult.Found);
        _logger.LogInformation("Public room found: {RoomGuid}", publicRoom.RoomUID);
        return publicRoom.ToRoomInfoDto();
      }

      return await CreateRoomAsync(RoomOptions.DefaultPublicRoomOptions);
    }

    public async Task<RoomInfoDto> CreateRoomAsync(RoomOptions options)
    {
      var room = Room.Create(options);
      await _gameFactoryService.CreateNewGameAsync(room);
      await _roomRepository.CreateRoomAsync(room);

      _metrics.AddRoomCreated(room);
      _metrics.AddGameCraeted(room.GetCurrentGame());

      if (options.IsPublic)
      {
        _metrics.AddPublicGameAttempt(PublicGameResult.Created);
      }

      _logger.LogInformation("Room successfully created. Room: {RoomGuid}. IsPublic: {IsPublic}", room.RoomUID, room.IsPublic);
      return room.ToRoomInfoDto();
    }

    public async Task<RoomInfoDto> CreateNextRoundAsync(Guid roomGuid)
    {
      Room room = await _roomRepository.GetRoomByGuidAsync(roomGuid) ?? throw new RoomNotFoundException(roomGuid);

      var game = await _gameFactoryService.CreateNewGameAsync(room);
      game.Start();

      await _roomRepository.UpdateAsync(room);

      _logger.LogInformation("Created next round. Games count: {GamesCount}. Room: {RoomGuid}.", room.RoomUID, room.Games.Count);
      _metrics.AddGameCraeted(game);

      return room.ToRoomInfoDto();
    }

    public async Task<RoomDto> JoinRoomAsync(Guid roomGuid, HttpRequest request)
    {
      Room room = await _roomRepository.GetRoomByGuidAsync(roomGuid) ?? throw new RoomNotFoundException(roomGuid);

      Guid userGuid = request.GetUserGuid();
      GamePlayer player = room.Join(userGuid);
      await _roomRepository.UpdateAsync(room);

      Game game = await _gameRepository.GetByRoomGuidAsync(roomGuid) ?? throw new GameNotFoundException(roomGuid);

      return room.ToRoomDto(game, player);
    }

    public async Task<RoomDto> GetRoomAsync(Guid roomGuid, HttpRequest request)
    {
      Room room = await _roomRepository.GetRoomByGuidAsync(roomGuid) ?? throw new RoomNotFoundException(roomGuid);

      Guid userGuid = request.GetUserGuid();
      GamePlayer? player = room.GetPlayer(userGuid);

      Game game = await _gameRepository.GetByRoomGuidAsync(roomGuid) ?? throw new GameNotFoundException(roomGuid);

      return room.ToRoomDto(game, player);
    }

    public async Task<RoomDto> MakeMoveAsync(Guid roomGuid, int fieldId, string championName, HttpRequest request)
    {
      var room = await _roomRepository.GetRoomByGuidAsync(roomGuid) ?? throw new RoomNotFoundException(roomGuid);

      var game = room.GetCurrentGame() ?? throw new GameNotFoundException(roomGuid);

      if (game.StatusId != GameStateType.InProgress)
      {
        throw new GameNotInProgressException();
      }

      var categoryFields = game.GetGameCategories().GetCategoryFields(fieldId);
      var championFilter = ChampionFilter.Create(categoryFields);
      var possibleChampions = await _championService.GetAllChampionsAsync(championFilter);

      Guid currentPlayerGuid = request.GetUserGuid();
      var currentPlayer = room.GetPlayer(currentPlayerGuid);
      var moveResult = game.MakeMove(fieldId, championName, possibleChampions.Select(c => c.Name), currentPlayer);
      if (moveResult == MoveResult.STEAL)
      {
        currentPlayer.Steals--;
      }
      game.UpdateDate();

      await _gameRepository.UpdateAsync(game);
      _metrics.AddChampionGuess(championName, championFilter);

      return await GetRoomAsync(roomGuid, request);
    }

    public async Task SkipCurrentPlayerMoveAsync(Guid roomGuid)
    {
      await SkipMoveAsync(roomGuid);
    }

    public async Task<RoomDto> SkipCurrentPlayerMoveAsync(Guid roomGuid, HttpRequest request)
    {
      var game = await SkipMoveAsync(roomGuid) ?? throw new GameNotFoundException(roomGuid);

      return await GetRoomAsync(roomGuid, request);
    }

    public async Task<RoomDto> RequestDrawAsync(Guid roomGuid, HttpRequest request)
    {
      var game = await _gameRepository.GetByRoomGuidAsync(roomGuid) ?? throw new GameNotFoundException(roomGuid);

      game.RequestDraw();
      game.SetNextPlayerTurn();
      game.UpdateDate();

      await _gameRepository.UpdateAsync(game);
      return await GetRoomAsync(roomGuid, request);
    }

    public async Task<RoomDto> RespondDrawRequestAsync(Guid roomGuid, HttpRequest request)
    {
      var game = await _gameRepository.GetByRoomGuidAsync(roomGuid) ?? throw new GameNotFoundException(roomGuid);

      game.SetDraw();
      game.UpdateDate();

      await _gameRepository.UpdateAsync(game);
      return await GetRoomAsync(roomGuid, request);
    }

    public async Task CloseRoomAsync(Guid roomGuid)
    {
      var game = await _gameRepository.GetByRoomGuidAsync(roomGuid) ?? throw new GameNotFoundException(roomGuid);

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
      var game = await _gameRepository.GetByRoomGuidAsync(roomGuid) ?? throw new GameNotFoundException(roomGuid);

      game.SetNextPlayerTurn();
      game.CancelDrawRequest();
      game.UpdateDate();

      await _gameRepository.UpdateAsync(game);
      return game;
    }

    public async Task<Dictionary<GameStateType, int>> GetGamesByStateCount()
    {
      return await _gameRepository.GetGamesByStateCount();
    }
  }
}

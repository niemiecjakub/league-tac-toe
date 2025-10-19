using LeagueChampions.Models.Dto;
using LeagueChampions.Models.ValueObjects;

namespace LeagueChampions.Service.Interfaces
{
  public interface IGameService
  {
    Task<RoomInfoDto> CreateRoomAsync(RoomOptions options);
    Task<RoomInfoDto> CreateNextRoundAsync(Guid roomGuid);
    Task<RoomInfoDto> GetOrCreatePublicRoomAsync();
    Task<RoomDto> JoinRoomAsync(Guid roomGuid, HttpRequest request);
    Task<RoomDto> GetRoomAsync(Guid roomGuid, HttpRequest request);
    Task<RoomDto?> MakeMoveAsync(Guid roomGuid, int fieldId, string championName, HttpRequest request);
    Task<RoomDto?> SkipCurrentPlayerMoveAsync(Guid roomGuid, HttpRequest request);
    Task SkipCurrentPlayerMoveAsync(Guid roomGuid);
    Task<RoomDto?> RequestDrawAsync(Guid roomGuid, HttpRequest request);
    Task<RoomDto?> RespondDrawRequestAsync(Guid roomGuid, HttpRequest request);
    Task CloseRoomAsync(Guid roomGuid);
  }
}

using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Entity;

namespace LeagueChampions.Models.Mapper
{
  public static class RoomMapper
  {
    public static RoomInfoDto ToRoomInfoDto(this Room room)
    {
      return new RoomInfoDto
      {
        RoomGuid = room.RoomUID.ToString(),
        StealsEnabled = room.StealsEnabled,
        TurnTime = room.TurnTime,
        IsPublic = room.IsPublic,
      };
    }

    public static RoomDto ToRoomDto(this Room room, Game game, GamePlayer gamePlayer)
    {
      return new RoomDto
      {
        RoomGuid = room.RoomUID.ToString(),
        StealsEnabled = room.StealsEnabled,
        TurnTime = room.TurnTime,
        Game = game.ToGameDto(),
        Slot = gamePlayer.ToGameSlotDto(),
        Score = room.ToScoreDto(gamePlayer),
        IsPublic = room.IsPublic
      };
    }
  }
}

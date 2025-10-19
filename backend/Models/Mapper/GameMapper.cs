using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Entity;

namespace LeagueChampions.Models.Mapper
{
  public static class GameMapper
  {
    public static GameDto ToGameDto(this Game game)
    {
      return new GameDto
      {
        Id = game.Id,
        RoomUid = game.RoomUID.ToString(),
        BoardState = game.BoardState,
        Categories = game.Categories,
        CurrentPlayerTurn = game.CurrentTurnId,
        GameStatus = game.StatusId,
        Winner = game.WinnerId,
        DrawRequestedId = game.DrawRequestedId,
      };
    }

    public static GameSlotDto ToGameSlotDto(this GamePlayer gamePlayer)
    {
      return new GameSlotDto
      {
        PlayerType = gamePlayer.PlayerId,
        Steals = gamePlayer.Steals,
      };
    }
  }
}

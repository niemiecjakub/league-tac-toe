using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Entity;

namespace LeagueChampions.Models.Mapper
{
  public static class ScoreMapper
  {
    public static ScoreDto ToScoreDto(this Room room, GamePlayer gamePlayer)
    {
      var finishedGames = room.Games.Where(g => g.IsFinished);
      return new ScoreDto
      {
        You = finishedGames.Count(g => g.WinnerId == gamePlayer.PlayerId || g.IsDraw),
        Opponent = finishedGames.Count(g => g.WinnerId != gamePlayer.PlayerId || g.IsDraw)
      };
    }
  }
}

namespace EsportData.Models
{
  public record League(int Id, string Name);
  public record Game(string Id, string LeagueId, DateTime? Date, string Patch, int Year);
  public record Player(string Name);
  public record Team(string Name);
  public record GameBan(string GameId, string TeamId, string BannedChampionId);
  public record PlayerChampion(string PlayerId, string ChampionId, string GameId, string TeamId, PlayerPosition? Position, GameResult GameResult);
}

namespace LeagueChampions.Models.Entity
{
  public class ChampionPosition
  {
    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;

    public int PositionId { get; set; }
    public Position Position { get; set; } = null!;
  }
}

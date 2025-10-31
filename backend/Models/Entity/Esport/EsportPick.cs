using LeagueChampions.Models.Enums;

namespace LeagueChampions.Models.Entity.Esport
{
  public class EsportPick
  {
    public int Id { get; set; }
    public bool Victory { get; set; }
    public EsportMapSide Side { get; set; }

    public int PlayerId { get; set; }
    public EsportPlayer Player { get; set; } = null!;

    public int ChampionId { get; set; }
    public Champion Champion { get; set; } = null!;

    public string GameId { get; set; } = null!;
    public EsportGame Game { get; set; } = null!;

    public int TeamId { get; set; }
    public EsportTeam Team { get; set; } = null!;

    public int PositionId { get; set; }
    public Position Position { get; set; } = null!;
  }
}

namespace LeagueChampions.Models.Dto
{
  public record ChampionDto
  {
    public int Id { get; init; }
    public string Name { get; init; } = null!;
    public string Title { get; init; } = null!;
    public string ImageUrl { get; init; } = null!;
    public string Resource { get; init; } = null!;
    public string Region { get; init; } = null!;
    public List<string> Legacies { get; init; } = null!;
    public List<string> Positions { get; init; } = null!;
    public List<string> RangeTypes { get; init; } = null!;
  }
}

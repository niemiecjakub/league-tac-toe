namespace LeagueChampions.Models.Dto
{
  public record ChampionMetaFiltersDto
  {
    public List<MetaFilterDto> Filters { get; set; } = null!;
  }

  public record MetaFilterDto
  {
    public string Name { get; set; } = null!;
    public string Value { get; set; } = null!;
    public List<MetaFilterOptionDto> Options { get; set; } = null!;
  }

  public record MetaFilterOptionDto
  {
    public int Id { get; init; }
    public string Name { get; init; } = null!;
  }

}

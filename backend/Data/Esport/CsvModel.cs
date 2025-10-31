using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;
using LeagueChampions.Models.Enums;

namespace LeagueChampions.Data.Esport
{
  public record LeagueCsv(string Name);
  public record GameCsv(string GameId, string LeagueName, string Split, DateTime Date, string Patch, int Year);
  public record PlayerCsv(string Name, PositionType MainPosition);
  public record TeamCsv(string Name);
  public record BanCsv(string GameId, string TeamName, string BannedChampionName);
  public record PickCsv(string PlayerName, string ChampionName, string GameId, string TeamName, PositionType Position, bool Victory, EsportMapSide MapSide);

  public class CsvModel
  {
    public string GameId { get; set; } = null!;
    public string League { get; set; } = null!;
    public int Year { get; set; }
    public string Split { get; set; } = null!;
    public DateTime Date { get; set; }
    public string Patch { get; set; } = null!;
    public int ParticipantId { get; set; }
    public PositionType? Position { get; set; }
    public string PlayerName { get; set; } = null!;
    public string TeamName { get; set; } = null!;
    public string Champion { get; set; } = null!;
    public List<string> Bans { get; set; } = new List<string>();
    public bool Victory { get; set; }
    public EsportMapSide Side { get; set; }
  }
  public class CsvRecordMap : ClassMap<CsvModel>
  {
    public CsvRecordMap()
    {
      Map(m => m.GameId).Name("gameid");
      Map(m => m.League).Name("league");
      Map(m => m.Year).Name("year");
      Map(m => m.Split).Name("split");
      Map(m => m.Date).Name("date").TypeConverterOption.Format("yyyy-MM-dd HH:mm:ss");
      Map(m => m.Patch).Name("patch");
      Map(m => m.ParticipantId).Name("participantid");
      Map(m => m.Position).Name("position").TypeConverter<PlayerPositionConverter>();
      Map(m => m.PlayerName).Name("playername");
      Map(m => m.TeamName).Name("teamname");
      Map(m => m.Champion).Name("champion");
      Map(m => m.Bans).Convert(row =>
      {
        return new List<string?>
        {
          row.Row.GetField("ban1"),
          row.Row.GetField("ban2"),
          row.Row.GetField("ban3"),
          row.Row.GetField("ban4"),
          row.Row.GetField("ban5")
        }.Where(s => !string.IsNullOrEmpty(s))
        .ToList()!;
      });
      Map(m => m.Victory).Name("result");
      Map(m => m.Side).Name("side");
    }
  }

  public class PlayerPositionConverter : ITypeConverter
  {
    public object? ConvertFromString(string? text, IReaderRow row, MemberMapData memberMapData)
    {
      return text switch
      {
        "top" => PositionType.Top,
        "jng" => PositionType.Jungle,
        "mid" => PositionType.Middle,
        "bot" => PositionType.Bottom,
        "sup" => PositionType.Support,
        _ => null
      };
    }

    public string? ConvertToString(object? value, IWriterRow row, MemberMapData memberMapData)
    {
      return value switch
      {
        PositionType.Top => "top",
        PositionType.Jungle => "jng",
        PositionType.Middle => "mid",
        PositionType.Bottom => "bot",
        PositionType.Support => "sup",
        _ => null
      };
    }
  }
}

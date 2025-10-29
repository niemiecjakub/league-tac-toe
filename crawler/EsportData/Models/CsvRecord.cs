using CsvHelper;
using CsvHelper.Configuration;
using CsvHelper.TypeConversion;

namespace EsportData.Models
{
  public class CsvRecord
  {
    public string GameId { get; set; }
    public string League { get; set; }
    public int Year { get; set; }
    public string Split { get; set; }
    public DateTime? Date { get; set; }
    public string Patch { get; set; }
    public int ParticipantId { get; set; }
    public PlayerPosition? Position { get; set; }
    public string PlayerName { get; set; }
    public string PlayerId { get; set; }
    public string TeamName { get; set; }
    public string TeamId { get; set; }
    public string Champion { get; set; }
    public List<string> Bans { get; set; } = new List<string>();
    public GameResult Result { get; set; }
  }

  public enum PlayerPosition
  {
    Top,
    Jungle,
    Bottom,
    Support,
    Mid
  }

  public enum GameResult
  {
    Victory = 1,
    Defeat = 0,
  }

  public class CsvRecordMap : ClassMap<CsvRecord>
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
      Map(m => m.PlayerId).Name("playerid");
      Map(m => m.TeamName).Name("teamname");
      Map(m => m.TeamId).Name("teamid");
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
      Map(m => m.Result).Name("result");
    }
  }


  public class PlayerPositionConverter : ITypeConverter
  {
    public object? ConvertFromString(string? text, IReaderRow row, MemberMapData memberMapData)
    {
      return text switch
      {
        "top" => PlayerPosition.Top,
        "jng" => PlayerPosition.Jungle,
        "mid" => PlayerPosition.Mid,
        "bot" => PlayerPosition.Bottom,
        "sup" => PlayerPosition.Support,
        _ => null
      };
    }

    public string? ConvertToString(object? value, IWriterRow row, MemberMapData memberMapData)
    {
      return value switch
      {
        PlayerPosition.Top => "top",
        PlayerPosition.Jungle => "jng",
        PlayerPosition.Mid => "mid",
        PlayerPosition.Bottom => "bot",
        PlayerPosition.Support => "sup",
        _ => null
      };
    }
  }

}

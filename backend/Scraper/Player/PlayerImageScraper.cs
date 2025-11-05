using HtmlAgilityPack;
using LeagueChampions.Data.Esport;

namespace LeagueChampions.Scraper.Player
{
  public class PlayerImageScraper
  {
    private static readonly HttpClient httpClient = new HttpClient();
    private readonly string _destinationFolder;
    public PlayerImageScraper(string destinationFolder)
    {
      _destinationFolder = destinationFolder;
    }

    public async Task Run()
    {
      var existingImageNames = GetExistingImageNames();
      var playersToBeFetched = EsportStatsProcessor.ANALYZED_PLAYERS
        .Where(playerName => !existingImageNames.Any(f => f.Contains(playerName)))
        .ToList();

      if (playersToBeFetched.Count == 0)
      {
        Console.WriteLine("No players to fetch. Foler has all images");
        return;
      }

      var succeed = new List<string>();
      var failed = new List<string>();

      foreach (var playerName in playersToBeFetched)
      {
        try
        {
          Console.WriteLine($"--- {playerName} ---");

          await DownloadPlayerImageAsync(playerName);
          await DownloadPlayerImageAsync(playerName);

          Console.WriteLine("SUCCESS");
          succeed.Add(playerName);
        }
        catch (Exception ex)
        {
          Console.WriteLine($"Error: {ex.Message}");
          failed.Add(playerName);
        }
      }


      Console.WriteLine($"Succeed: {succeed.Count}/{playersToBeFetched.Count}");
      Console.WriteLine($"Failed: {failed.Count}/{playersToBeFetched.Count}");
      foreach (var failedPlayer in failed)
      {
        Console.WriteLine($"--- {failedPlayer}");
      }
    }

    private string[] GetExistingImageNames()
    {
      if (Directory.Exists(_destinationFolder))
      {
        return Directory.GetFiles(_destinationFolder);
      }
      return Array.Empty<string>();
    }

    public async Task<string> DownloadPlayerImageAsync(string playerName)
    {
      if (string.IsNullOrWhiteSpace(playerName))
      {
        throw new ArgumentException("Player name cannot be empty.", nameof(playerName));
      }

      ANALYZED_PLAYERS_URL_MAPPING.TryGetValue(playerName, out var urlMapping);

      string url = urlMapping ?? $"https://lol.fandom.com/wiki/{playerName}";

      Console.WriteLine($"Fetching page: {url}");

      var html = await httpClient.GetStringAsync(url);

      var htmlDoc = new HtmlDocument();
      htmlDoc.LoadHtml(html);

      string imageUrl = TryGetImageUrl(htmlDoc.DocumentNode);

      if (imageUrl.StartsWith("//"))
      {
        imageUrl = "https:" + imageUrl;
      }

      Console.WriteLine($"Found image URL: {imageUrl}");

      byte[] imageBytes = await httpClient.GetByteArrayAsync(imageUrl);

      string fileName = Path.Combine(_destinationFolder, $"{playerName.ToLowerInvariant().Replace(" ", "")}.webp");
      await File.WriteAllBytesAsync(fileName, imageBytes);

      Console.WriteLine($"Image saved as {fileName.ToLower()}");
      return fileName;
    }

    private string TryGetImageUrl(HtmlNode node)
    {
      var imageNode = node.SelectSingleNode("//*[@id=\"infoboxPlayer\"]/img[1]");
      string imageUrl = string.Empty;
      if (imageNode != null)
      {
        imageUrl = imageNode.GetAttributeValue("src", null!);

        if (string.IsNullOrWhiteSpace(imageUrl) || imageUrl.Contains("data:image/gif"))
        {
          imageUrl = node.GetAttributeValue("data-src", null!);
        }
      }
      else
      {
        var infoboxNode = node.SelectSingleNode("//*[@class='infobox-wide']");
        imageNode = infoboxNode.SelectSingleNode(".//img");

        if (imageNode == null)
        {
          throw new Exception("Image not found. The page structure may have changed.");
        }

        imageUrl = imageNode.GetAttributeValue("data-src", null!) ?? imageNode.GetAttributeValue("src", null!);
      }

      if (string.IsNullOrWhiteSpace(imageUrl))
      {
        throw new Exception("Image URL not found.");
      }

      return imageUrl;
    }

    private Dictionary<string, string> ANALYZED_PLAYERS_URL_MAPPING = new()
    {
      ["Kami"] = "https://lol.fandom.com/wiki/Kami_(Gabriel_Bohm_Santos)",
      ["Knight"] = "https://lol.fandom.com/wiki/Knight_(Zhuo_Ding)",
      ["Maple"] = "https://lol.fandom.com/wiki/Maple_(Huang_Yi-Tang)",
      ["Tarzan"] = "https://lol.fandom.com/wiki/Tarzan_(Lee_Seung-yong)",
      ["Ming"] = "https://lol.fandom.com/wiki/Ming_(Shi_Sen-Ming)"
    };
  }
}

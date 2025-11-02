using ImageScraper.Player;

namespace ImageScraper
{
  internal class Program
  {
    static async Task Main(string[] args)
    {
      string destinationFolderPath = "";
      var scraper = new PlayerImageScraper(destinationFolderPath);
      await scraper.Run();
    }
  }
}

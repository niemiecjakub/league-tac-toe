using ImageScraper.Player;
using HtmlAgilityPack;

namespace ImageScraper
{
  internal class Program
  {
    static async Task Main(string[] args)
    {
      string destinationFolderPath = "Images/Players";
      var scraper = new PlayerImageScraper(destinationFolderPath);
      await scraper.Run();
    }
  }
}

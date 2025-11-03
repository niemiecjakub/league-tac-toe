using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Data.Esport
{
  public static class EsportDbSeed
  {
    public static void SeedEsportData(IDbContextFactory<AppDbContext> contextFactory)
    {
      var paths = Directory.GetFiles("Data/Esport/SourceFiles", "*.csv").ToList();
      EsportDataResult esportData = EsportDataReader.LoadData(paths);

      var processor = new EsportsDbProcessor(contextFactory, esportData);
      processor.ProcessDb();
    }


    public static void SeedEsportStats(IDbContextFactory<AppDbContext> contextFactory)
    { 
      var paths = Directory.GetFiles("Data/Esport/SourceFiles", "*.csv").ToList();
      EsportDataResult esportData = EsportDataReader.LoadData(paths);

      var processor = new EsportStatsProcessor(contextFactory, esportData);
      processor.ProcessStats();
    }
  }
}

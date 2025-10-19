using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Filters;
using LeagueChampions.Models.ValueObjects;
using LeagueChampions.Service.Interfaces;

namespace LeagueChampions.Service
{
  public class GameFactoryService : IGameFactoryService
  {
    private readonly IChampionService _championService;
    private readonly IMetaFilterService _metaFilterService;

    public GameFactoryService(IChampionService championService, IMetaFilterService metaFilterService)
    {
      _championService = championService;
      _metaFilterService = metaFilterService;
    }

    public async Task<Game> CreateNewGameAsync(Room room)
    {
      var metaData = await _metaFilterService.GetMetaFiltersAsync();
      var flatOptions = metaData.Filters
          .SelectMany(f => f.Options.Select(opt => new CategoryField(f.Name, opt.Name)))
          .ToList();

      var totalOptions = flatOptions.Count;

      while (true)
      {
        var usedIndexes = new HashSet<int>();
        var horizontal = PickThreeUnique(flatOptions, usedIndexes, totalOptions);
        var vertical = PickThreeUnique(flatOptions, usedIndexes, totalOptions);

        var gameCategories = new GameCategories
        {
          Horizontal = horizontal,
          Vertical = vertical
        };

        if (await IsGameBoardValidAsync(gameCategories))
        {
          return room.CreateNewGame(gameCategories);
        }
      }
    }

    private List<CategoryField> PickThreeUnique(List<CategoryField> fieldList, HashSet<int> alreadyPickedIndexes, int fieldPossibilityNumber)
    {
      var result = new List<CategoryField>();
      var random = new Random();

      while (result.Count < 3)
      {
        int index = random.Next(0, fieldPossibilityNumber);
        if (!alreadyPickedIndexes.Contains(index))
        {
          result.Add(fieldList[index]);
          alreadyPickedIndexes.Add(index);
        }
      }

      return result;
    }

    private async Task<bool> IsGameBoardValidAsync(GameCategories gameBoard)
    {
      var pairs = gameBoard.Vertical
          .SelectMany(v => gameBoard.Horizontal.Select(h => (Vertical: v, Horizontal: h)))
          .ToList();

      foreach (var (vertical, horizontal) in pairs)
      {
        var filter = ChampionFilter.Create([vertical, horizontal]);
        var champions = await _championService.GetAllChampionsAsync(filter);
        if (!champions.Any())
        {
          return false;
        }
      }

      return true;
    }
  }

}

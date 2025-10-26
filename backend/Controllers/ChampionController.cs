using LeagueChampions.Models.Dto;
using LeagueChampions.Models.Filters;
using LeagueChampions.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeagueChampions.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ChampionController : ControllerBase
  {
    private readonly ILogger<ChampionController> _logger;
    private readonly IChampionService _championService;

    public ChampionController(ILogger<ChampionController> logger, IChampionService championService)
    {
      _logger = logger;
      _championService = championService;
    }

    [HttpGet("all")]
    public async Task<IActionResult> Get([FromQuery] ChampionFilter filter)
    {
      _logger.LogDebug("Fetching champions with filter: {Filter}", filter.GetFilterSummary());
      var champions = await _championService.GetAllChampionsAsync(filter);
      _logger.LogDebug("Returning {ChampionCount} champions", champions.Count());

      return Ok(champions);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
      _logger.LogDebug("Fetching champion with id {Id}", id);
      ChampionDto champion = await _championService.GetChampionByIdAsync(id);
      _logger.LogDebug("Returning champion with id {Id}", id);

      return Ok(champion);
    }
  }
}

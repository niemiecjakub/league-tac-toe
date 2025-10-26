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
      _logger.LogInformation("Fetching champions with: {@Filter}", filter);
      var champions = await _championService.GetAllChampionsAsync(filter);
      _logger.LogInformation("Returning {ChampionCount} champions", champions.Count());
      return Ok(champions);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetByIdAsync(int id)
    {
      _logger.LogInformation("Fetching champion with id {Id}", id);
      var champion = await _championService.GetChampionByIdAsync(id);
      if (champion == null)
      {
        _logger.LogWarning("Champion with id {Id} not found", id);
        return NotFound();
      }
      _logger.LogInformation("Returning champion with id {Id}", id);
      return Ok(champion);
    }
  }
}

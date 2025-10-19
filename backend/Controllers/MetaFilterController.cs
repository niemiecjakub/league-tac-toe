﻿using LeagueChampions.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeagueChampions.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class MetaFilterController : ControllerBase
  {
    private readonly ILogger<ChampionController> _logger;
    private readonly IMetaFilterService _metaFilterService;

    public MetaFilterController(ILogger<ChampionController> logger, IMetaFilterService metaFilterService)
    {
      _logger = logger;
      _metaFilterService = metaFilterService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      _logger.LogInformation("Fetching metadata");
      var championMetaFilterDto = await _metaFilterService.GetMetaFiltersAsync();
      _logger.LogInformation("Metadata fetched");
      return Ok(championMetaFilterDto);
    }
  }
}

using LeagueChampions.Models.Dto;
using LeagueChampions.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LeagueChampions.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class FeedbackController : ControllerBase
  {
    private readonly ILogger<FeedbackController> _logger;
    private readonly IFeedbackService _feedbackService;

    public FeedbackController(ILogger<FeedbackController> logger, IFeedbackService feedbackService)
    {
      _logger = logger;
      _feedbackService = feedbackService;
    }

    [HttpPost]
    public async Task<IActionResult> SubmitFeedback([FromBody] FeedbackRequestDto request)
    {
      if (!ModelState.IsValid)
      {
        _logger.LogWarning("Feedback submission validation failed. ModelState errors: {Errors}", 
          string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));
        return BadRequest(ModelState);
      }

      var feedback = await _feedbackService.SubmitFeedbackAsync(request.Sender, request.Message);
      return StatusCode(201);
    }
  }
}

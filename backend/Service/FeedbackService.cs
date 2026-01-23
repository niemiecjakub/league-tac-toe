using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using LeagueChampions.Service.Interfaces;
using System.Text.RegularExpressions;

namespace LeagueChampions.Services
{
  public class FeedbackService : IFeedbackService
  {
    private readonly IFeedbackRepository _feedbackRepository;
    private readonly ILogger<FeedbackService> _logger;

    public FeedbackService(IFeedbackRepository feedbackRepository, ILogger<FeedbackService> logger)
    {
      _feedbackRepository = feedbackRepository;
      _logger = logger;
    }

    public async Task<Feedback> SubmitFeedbackAsync(string? sender, string message)
    {
      var sanitizedSender = SanitizeInput(sender);
      var sanitizedMessage = SanitizeInput(message);

      string? finalSender = null;
      if (!string.IsNullOrWhiteSpace(sanitizedSender))
      {
        if (sanitizedSender.Length > 200)
        {
          throw new ArgumentException("Sender must not exceed 200 characters.", nameof(sender));
        }
        finalSender = sanitizedSender;
      }

      if (string.IsNullOrWhiteSpace(sanitizedMessage))
      {
        throw new ArgumentException("Message is required.", nameof(message));
      }

      if (sanitizedMessage.Length > 5000)
      {
        throw new ArgumentException("Message must not exceed 5000 characters.", nameof(message));
      }

      var feedback = new Feedback
      {
        Sender = finalSender,
        Message = sanitizedMessage,
        CreatedAt = DateTime.UtcNow
      };

      _logger.LogInformation("Submitting feedback from sender: {Sender}, message length: {MessageLength}", 
        finalSender ?? "anonymous", sanitizedMessage.Length);

      var createdFeedback = await _feedbackRepository.CreateFeedbackAsync(feedback);

      _logger.LogInformation("Feedback submitted successfully with ID: {FeedbackId}", createdFeedback.Id);

      return createdFeedback;
    }

    private static string SanitizeInput(string? input)
    {
      if (string.IsNullOrWhiteSpace(input))
      {
        return string.Empty;
      }
      var sanitized = Regex.Replace(input, "<.*?>", string.Empty, RegexOptions.IgnoreCase | RegexOptions.Compiled);
      return sanitized.Trim();;
    }
  }
}

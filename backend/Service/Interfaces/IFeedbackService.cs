using LeagueChampions.Models.Entity;

namespace LeagueChampions.Service.Interfaces
{
  public interface IFeedbackService
  {
    Task<Feedback> SubmitFeedbackAsync(string? sender, string message);
  }
}

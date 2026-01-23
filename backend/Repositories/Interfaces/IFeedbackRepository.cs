using LeagueChampions.Models.Entity;

namespace LeagueChampions.Repositories.Interfaces
{
  public interface IFeedbackRepository
  {
    Task<Feedback> CreateFeedbackAsync(Feedback feedback);
  }
}

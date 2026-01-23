using LeagueChampions.Models.Entity;
using LeagueChampions.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace LeagueChampions.Repositories
{
  public class FeedbackRepository : IFeedbackRepository
  {
    private readonly AppDbContext _context;

    public FeedbackRepository(AppDbContext context)
    {
      _context = context;
    }

    public async Task<Feedback> CreateFeedbackAsync(Feedback feedback)
    {
      _context.Feedback.Add(feedback);
      await _context.SaveChangesAsync();
      return feedback;
    }
  }
}

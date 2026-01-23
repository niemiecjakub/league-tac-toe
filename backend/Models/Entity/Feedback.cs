using System.ComponentModel.DataAnnotations;

namespace LeagueChampions.Models.Entity
{
  public class Feedback
  {
    public int Id { get; set; }

    [MaxLength(200)]
    public string? Sender { get; set; }

    [Required]
    [MaxLength(5000)]
    public string Message { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
  }
}

using System.ComponentModel.DataAnnotations;

namespace LeagueChampions.Models.Dto
{
  public class FeedbackRequestDto
  {
    [StringLength(200)]
    public string? Sender { get; set; }

    [Required]
    [StringLength(5000)]
    public string Message { get; set; } = null!;
  }
}

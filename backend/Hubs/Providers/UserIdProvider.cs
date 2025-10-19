using Microsoft.AspNetCore.SignalR;

namespace LeagueChampions.Hubs.Providers
{
  public class UserIdProvider : IUserIdProvider
  {
    public string? GetUserId(HubConnectionContext connection)
    {
      var httpContext = connection.GetHttpContext();
      return httpContext?.Request.Query["access_token"];
    }
  }
}
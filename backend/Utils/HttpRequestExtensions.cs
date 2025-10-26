namespace LeagueChampions.Utils
{
  public static class HttpRequestExtensions
  {
    public static Guid GetUserGuid(this HttpRequest request)
    {
      var authHeader = request.Headers["Authorization"].ToString();
      if (authHeader.StartsWith("Bearer "))
      {
        return new Guid(authHeader.Substring("Bearer ".Length));
      }

      return new Guid(request.Query["access_token"].ToString());
    }
  }
}

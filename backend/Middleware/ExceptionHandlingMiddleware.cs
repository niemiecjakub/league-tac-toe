using LeagueChampions.Exceptions;
using System.Net;
using System.Text.Json;

namespace LeagueChampions.Middleware
{
  public class ExceptionHandlingMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
      _next = next;
      _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (Exception ex)
      {
        await HandleExceptionAsync(context, ex, _logger);
      }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception ex, ILogger logger)
    {
      HttpStatusCode status;
      string message;

      switch (ex)
      {
        case ChampionNotFoundException championNotFoundEx:
          status = HttpStatusCode.NotFound;
          message = $"Champion with Id:{championNotFoundEx.ChampionId} not found.";
          logger.LogError(ex, message);
          break;

        case GameNotFoundException gameNotFoundEx:
          status = HttpStatusCode.NotFound;
          message = $"Game for Room {gameNotFoundEx.RoomGuid} not found.";
          logger.LogError(ex, message);
          break;

        case GameNotInProgressException gameNotInprogressEx:
          status = HttpStatusCode.BadRequest;
          message = $"Game is not in progress.";
          logger.LogError(ex, message);
          break;

        case RoomJoinFailedException roomJoinFailedException:
          status = HttpStatusCode.BadRequest;
          message = roomJoinFailedException.Message;
          logger.LogError(ex, $"User {roomJoinFailedException.UserGuid} tried to join room {roomJoinFailedException.RoomGuid}. {roomJoinFailedException.Message}");
          break;

        case RoomNotFoundException roomNotFoundEx:
          status = HttpStatusCode.NotFound;
          message = $"Room {roomNotFoundEx.RoomGuid} not found.";
          logger.LogError(ex, message);
          break;

        default:
          status = HttpStatusCode.InternalServerError;
          message = "An unexpected error occurred.";
          logger.LogError(ex, ex.Message);
          break;
      }

      context.Response.ContentType = "application/json";
      context.Response.StatusCode = (int)status;

      var result = JsonSerializer.Serialize(new { error = message });
      await context.Response.WriteAsync(result);
    }
  }
}

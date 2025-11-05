using HealthChecks.UI.Client;
using LeagueChampions.Data;
using LeagueChampions.Hubs;
using LeagueChampions.Hubs.Providers;
using LeagueChampions.Metrics;
using LeagueChampions.Middleware;
using LeagueChampions.Repositories;
using LeagueChampions.Repositories.Interfaces;
using LeagueChampions.Scraper.Champion;
using LeagueChampions.Service;
using LeagueChampions.Service.Interfaces;
using LeagueChampions.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

namespace LeagueChampions
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var builder = WebApplication.CreateBuilder(args);

      builder.Services.AddControllers();
      builder.Services.AddEndpointsApiExplorer();
      builder.Services.AddSwaggerGen();
      builder.Services.AddMemoryCache();

      var dbConnectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;
      builder.Services.AddDbContextFactory<AppDbContext>(options =>
          options.UseNpgsql(dbConnectionString, o =>
          {
            o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
          }));

      builder.Services.AddScoped<IChampionRepository, ChampionRepository>();
      builder.Services.AddScoped<IMetafilterRepository, MetafilterRepository>();
      builder.Services.AddScoped<IRoomRepository, RoomRepository>();
      builder.Services.AddScoped<IGameRepository, GameRepository>();
      builder.Services.AddScoped<IGamePlayerRepository, GamePlayerRepository>();
      builder.Services.AddScoped<IGameFactoryService, GameFactoryService>();

      builder.Services.AddScoped<IChampionService, ChampionService>();
      builder.Services.AddScoped<IMetaFilterService, MetaFilterService>();
      builder.Services.AddScoped<IGameService, GameService>();
      builder.Services.AddSingleton<ICountdownService, CountdownService>();

      builder.Services.AddSingleton<IUserIdProvider, UserIdProvider>();
      builder.Services.AddSingleton<LeagueTacToeMetrics>();

      builder.Services.AddSignalR();
      builder.Services.AddHealthChecks()
        .AddNpgSql(dbConnectionString, tags: ["db"])
        .AddDbContextCheck<AppDbContext>(tags: ["dbContext"]);

      builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
      {
        options.Events = new JwtBearerEvents
        {
          OnMessageReceived = context =>
          {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/gamehub"))
            {
              context.Token = accessToken;
            }
            return Task.CompletedTask;
          }
        };
      });

      builder.Services.AddOpenTelemetry()
       .ConfigureResource(resource => resource.AddService(builder.Environment.ApplicationName))
       .WithMetrics(metrics =>
       {
         metrics.AddAspNetCoreInstrumentation();
         metrics.AddHttpClientInstrumentation();
         metrics.AddMeter(LeagueTacToeMetrics.Name);
         metrics.AddOtlpExporter();
       })
       .WithTracing(tracing =>
       {
         tracing.AddAspNetCoreInstrumentation();
         tracing.AddHttpClientInstrumentation();
         tracing.AddEntityFrameworkCoreInstrumentation();

         tracing.AddOtlpExporter();
       });

      builder.Logging.AddOpenTelemetry(logging =>
      {
        logging.IncludeFormattedMessage = true;
        logging.IncludeScopes = true;

        logging.AddOtlpExporter();
      });

      string[] allowedOrigins = builder.Configuration["ALLOWED_ORIGINS"]!.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries) ?? Array.Empty<string>();

      builder.Services.AddCors(options =>
      {
        options.AddPolicy("AllowFrontend", policy =>
        {
          policy
              .WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
        });
      });

      var app = builder.Build();

      app.UseSwagger();
      app.UseSwaggerUI();

      using (var scope = app.Services.CreateScope())
      {
        var contextFactory = scope.ServiceProvider.GetRequiredService<IDbContextFactory<AppDbContext>>();
        DbInitializer.Initialize(dbConnectionString);
        ChampionScraper.RunScrape(contextFactory).GetAwaiter().GetResult();
      }

      app.MapHealthChecks("/health", new HealthCheckOptions()
      {
        ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
      });
      app.UseCors("AllowFrontend");
      app.UseRouting();
      app.UseHttpsRedirection();
      app.UseAuthorization();
      app.MapControllers();
      app.UseMiddleware<ExceptionHandlingMiddleware>();
      app.MapHub<GameHub>("/gamehub");

      app.Run();
    }
  }
}

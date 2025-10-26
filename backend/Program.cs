using LeagueChampions.Repositories.Interfaces;
using LeagueChampions.Repositories;
using Microsoft.EntityFrameworkCore;
using LeagueChampions.Service.Interfaces;
using LeagueChampions.Services;
using LeagueChampions.Hubs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SignalR;
using LeagueChampions.Hubs.Providers;
using LeagueChampions.Service;
using LeagueChampions.Data;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using OpenTelemetry.Logs;
using OpenTelemetry;

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

      builder.Services.AddDbContextFactory<AppDbContext>(options =>
          options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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

      builder.Services.AddSignalR();

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
         metrics.AddMeter("Microsoft.AspNetCore.Hosting");
         metrics.AddMeter("Microsoft.AspNetCore.Server.Kestrel");

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

      builder.Services.AddCors(options =>
      {
        options.AddPolicy("AllowFrontend", policy =>
        {
          policy
              .WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
        });
      });

      var app = builder.Build();

      if (app.Environment.IsDevelopment())
      {
        app.UseSwagger();
        app.UseSwaggerUI();
      }
      DbInitializer.Initialize(app.Configuration["ConnectionStrings:DefaultConnection"]!);
      app.UseRouting();
      app.UseHttpsRedirection();
      app.UseAuthorization();
      app.MapControllers();
      app.MapHub<GameHub>("/gamehub");
      app.UseCors("AllowFrontend");

      app.Run();
    }
  }
}

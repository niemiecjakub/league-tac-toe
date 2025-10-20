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

      builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

      builder.Services.AddScoped<IChampionRepository, ChampionRepository>();
      builder.Services.AddScoped<ILegacyRepository, LegacyRepository>();
      builder.Services.AddScoped<IPositionRepository, PositionRepository>();
      builder.Services.AddScoped<IRangeTypeRepository, RangeTypeRepository>();
      builder.Services.AddScoped<IRegionRepository, RegionRepository>();
      builder.Services.AddScoped<IResourceRepository, ResourceRepository>();
      builder.Services.AddScoped<IRoomRepository, RoomRepository>();
      builder.Services.AddScoped<IGameRepository, GameRepository>();
      builder.Services.AddScoped<IGamePlayerRepository, GamePlayerRepository>();
      builder.Services.AddScoped<IGameFactoryService, GameFactoryService>();

      builder.Services.AddScoped<IChampionService, ChampionService>();
      builder.Services.AddScoped<IMetaFilterService, MetaFilterService>();
      builder.Services.AddScoped<IGameService, GameService>();
      builder.Services.AddSingleton<ICountdownService, CountdownService>();

      builder.Services.AddSingleton<IUserIdProvider, UserIdProvider>();

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

      builder.Services.AddSignalR();

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

﻿using LeagueChampions.Models.Entity;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
  public AppDbContext(DbContextOptions<AppDbContext> options)
      : base(options)
  {
  }

  public DbSet<Champion> Champion { get; set; }
  public DbSet<Legacy> Legacy { get; set; }
  public DbSet<Position> Position { get; set; }
  public DbSet<RangeType> RangeType { get; set; }
  public DbSet<Region> Region { get; set; }
  public DbSet<Resource> Resource { get; set; }

  public DbSet<ChampionLegacy> ChampionLegacy { get; set; }
  public DbSet<ChampionPosition> ChampionPosition { get; set; }
  public DbSet<ChampionRangeType> ChampionRangetype { get; set; }
  public DbSet<ChampionRegion> ChampionRegion { get; set; }
  public DbSet<ChampionResource> ChampionResource { get; set; }

  public DbSet<Room> Room { get; set; }
  public DbSet<Game> Game { get; set; }
  public DbSet<Player> Player { get; set; }
  public DbSet<GameState> GameState { get; set; }
  public DbSet<GamePlayer> GamePlayer { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    // Relationships
    modelBuilder.Entity<GameState>().HasKey(g => g.StateId);
    modelBuilder.Entity<Player>().HasKey(p => p.PlayerId);
    modelBuilder.Entity<Room>().HasKey(p => p.RoomUID);

    modelBuilder.Entity<ChampionLegacy>().HasKey(cl => new { cl.ChampionId, cl.LegacyId });

    modelBuilder.Entity<ChampionLegacy>()
        .HasOne(cl => cl.Champion)
        .WithMany(c => c.ChampionLegacy)
        .HasForeignKey(cl => cl.ChampionId);

    modelBuilder.Entity<ChampionLegacy>()
        .HasOne(cl => cl.Legacy)
        .WithMany(l => l.ChampionLegacy)
        .HasForeignKey(cl => cl.LegacyId);

    modelBuilder.Entity<ChampionPosition>().HasKey(cl => new { cl.ChampionId, cl.PositionId });

    modelBuilder.Entity<ChampionPosition>()
        .HasOne(cp => cp.Champion)
        .WithMany(c => c.ChampionPosition)
        .HasForeignKey(cp => cp.ChampionId);

    modelBuilder.Entity<ChampionPosition>()
        .HasOne(cp => cp.Position)
        .WithMany(p => p.ChampionPosition)
        .HasForeignKey(cp => cp.PositionId);

    modelBuilder.Entity<ChampionRangeType>().HasKey(cl => new { cl.ChampionId, cl.RangetypeId });

    modelBuilder.Entity<ChampionRangeType>()
        .HasOne(crt => crt.Champion)
        .WithMany(c => c.ChampionRangeType)
        .HasForeignKey(crt => crt.ChampionId);

    modelBuilder.Entity<ChampionRangeType>()
        .HasOne(crt => crt.RangeType)
        .WithMany(rt => rt.ChampionRangeType)
        .HasForeignKey(crt => crt.RangetypeId);

    modelBuilder.Entity<ChampionRegion>().HasKey(cl => new { cl.ChampionId, cl.RegionId });

    modelBuilder.Entity<ChampionRegion>()
        .HasOne(cr => cr.Champion)
        .WithMany(c => c.ChampionRegion)
        .HasForeignKey(cr => cr.ChampionId);

    modelBuilder.Entity<ChampionRegion>()
        .HasOne(cr => cr.Region)
        .WithMany(r => r.ChampionRegion)
        .HasForeignKey(cr => cr.RegionId);

    modelBuilder.Entity<ChampionResource>().HasKey(cl => new { cl.ChampionId, cl.ResourceId });

    modelBuilder.Entity<ChampionResource>()
        .HasOne(cr => cr.Champion)
        .WithMany(c => c.ChampionResource)
        .HasForeignKey(cr => cr.ChampionId);

    modelBuilder.Entity<ChampionResource>()
        .HasOne(cr => cr.Resource)
        .WithMany(r => r.ChampionResource)
        .HasForeignKey(cr => cr.ResourceId);

    modelBuilder.Entity<Room>()
        .Property(g => g.RoomUID)
        .HasConversion<string>();

    modelBuilder.Entity<Game>()
        .HasOne(g => g.Room)
        .WithMany(r => r.Games)
        .HasForeignKey(g => g.RoomUID);

    modelBuilder.Entity<Game>()
        .Property(g => g.CurrentTurnId)
        .HasConversion<int>();

    modelBuilder.Entity<Game>()
        .Property(g => g.StatusId)
        .HasConversion<int>();

    modelBuilder.Entity<Game>()
        .Property(g => g.WinnerId)
        .HasConversion<int>();

    modelBuilder.Entity<Game>()
        .Property(g => g.RoomUID)
        .HasConversion<string>();

    modelBuilder.Entity<GamePlayer>()
    .Property(g => g.RoomUID)
    .HasConversion<string>();

    modelBuilder.Entity<GamePlayer>()
        .Property(g => g.PlayerUID)
        .HasConversion<string>();

    modelBuilder.Entity<GamePlayer>()
        .Property(g => g.PlayerId)
        .HasConversion<int>();

    modelBuilder.Entity<GamePlayer>()
        .HasOne(gp => gp.Room)
        .WithMany(r => r.GamePlayers)
        .HasForeignKey(gp => gp.RoomUID);
  }
}

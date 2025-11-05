using LeagueChampions.Models.Entity;
using LeagueChampions.Models.Entity.Esport;
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
  public DbSet<ChampionRangeType> ChampionRangeType { get; set; }
  public DbSet<ChampionRegion> ChampionRegion { get; set; }
  public DbSet<ChampionResource> ChampionResource { get; set; }

  public DbSet<Room> Room { get; set; }
  public DbSet<Game> Game { get; set; }
  public DbSet<Player> Player { get; set; }
  public DbSet<GameState> GameState { get; set; }
  public DbSet<GamePlayer> GamePlayer { get; set; }


  public DbSet<EsportChampionStats> EsportChampionStats { get; set; }
  public DbSet<EsportPlayer> EsportPlayer { get; set; }
  public DbSet<EsportPlayerPick> EsportPlayerPick { get; set; }


  public DbSet<EsportBan> EsportBan { get; set; }
  public DbSet<EsportGame> EsportGame { get; set; }
  public DbSet<EsportLeague> EsportLeague { get; set; }
  public DbSet<EsportPick> EsportPick { get; set; }
  public DbSet<EsportTeam> EsportTeam { get; set; }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Champion>(entity =>
    {
      entity.HasKey(c => c.ChampionId);
      entity.Property(c => c.ChampionId).ValueGeneratedOnAdd();
      entity.Property(c => c.ChampionKey).IsRequired();
      entity.Property(c => c.Name).IsRequired();
      entity.Property(c => c.Title).IsRequired();
      entity.Property(c => c.ImageUrl).IsRequired();
    });

    modelBuilder.Entity<GameState>().HasKey(g => g.StateId);
    modelBuilder.Entity<Player>().HasKey(p => p.PlayerId);
    modelBuilder.Entity<Room>().HasKey(p => p.RoomUID);

    modelBuilder.Entity<Champion>()
    .HasOne(c => c.EsportStats)
    .WithOne(s => s.Champion)
    .HasForeignKey<EsportChampionStats>(s => s.ChampionId)
    .OnDelete(DeleteBehavior.Cascade);

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

    modelBuilder.Entity<ChampionRangeType>().HasKey(cl => new { cl.ChampionId, cl.RangeTypeId });

    modelBuilder.Entity<ChampionRangeType>()
        .HasOne(crt => crt.Champion)
        .WithMany(c => c.ChampionRangeType)
        .HasForeignKey(crt => crt.ChampionId);

    modelBuilder.Entity<ChampionRangeType>()
        .HasOne(crt => crt.RangeType)
        .WithMany(rt => rt.ChampionRangeType)
        .HasForeignKey(crt => crt.RangeTypeId);

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

    //ESPORT
    modelBuilder.Entity<EsportBan>(entity =>
    {
      entity.HasKey(e => new { e.GameId, e.TeamId, e.ChampionId });
    });

    modelBuilder.Entity<EsportPick>(entity =>
    {
      entity.HasKey(e => new { e.GameId, e.TeamId, e.PlayerId, e.ChampionId, e.PositionId });
    });

    modelBuilder.Entity<EsportPlayerPick>(entity =>
    {
      entity.HasKey(e => new { e.PlayerId, e.ChampionId });
    });

    modelBuilder.Entity<EsportChampionStats>(entity =>
    {
      entity.HasKey(c => c.ChampionId);
      entity.Property(s => s.WinRatio).HasPrecision(4, 2);
      entity.Property(s => s.PickRatio).HasPrecision(4, 2);
      entity.Property(s => s.BanRatio).HasPrecision(4, 2);
    });
  }
}

CREATE TABLE Champion (
    ChampionId INTEGER PRIMARY KEY,
    ChampionKey VARCHAR UNIQUE,
    Name VARCHAR UNIQUE,
    Title VARCHAR UNIQUE,
    ImageUrl VARCHAR UNIQUE
);
CREATE TABLE Legacy (
    Id INTEGER PRIMARY KEY,
    Name VARCHAR UNIQUE
);
CREATE TABLE Position (
    Id INTEGER PRIMARY KEY,
    Name VARCHAR UNIQUE
);
CREATE TABLE RangeType (
    Id INTEGER PRIMARY KEY,
    Name VARCHAR UNIQUE
);
CREATE TABLE Region (
    Id INTEGER PRIMARY KEY,
    Name VARCHAR UNIQUE
);
CREATE TABLE Resource (
    Id INTEGER PRIMARY KEY,
    Name VARCHAR UNIQUE
);
CREATE TABLE ChampionLegacy (
    ChampionId INTEGER,
    LegacyId INTEGER,
    FOREIGN KEY (ChampionId) REFERENCES Champion (ChampionId),
    FOREIGN KEY (LegacyId) REFERENCES Legacy (Id)
);
CREATE TABLE ChampionPosition (
    ChampionId INTEGER,
    PositionId INTEGER,
    FOREIGN KEY (ChampionId) REFERENCES Champion (ChampionId),
    FOREIGN KEY (PositionId) REFERENCES Position (Id)
);
CREATE TABLE ChampionRangeType (
    ChampionId INTEGER,
    RangeTypeId INTEGER,
    FOREIGN KEY (ChampionId) REFERENCES Champion (ChampionId),
    FOREIGN KEY (RangeTypeId) REFERENCES RangeType (Id)
);
CREATE TABLE ChampionRegion (
    ChampionId INTEGER,
    RegionId INTEGER,
    FOREIGN KEY (ChampionId) REFERENCES Champion (ChampionId),
    FOREIGN KEY (RegionId) REFERENCES Region (Id)
);
CREATE TABLE ChampionResource (
    ChampionId INTEGER,
    ResourceId INTEGER,
    FOREIGN KEY (ChampionId) REFERENCES Champion (ChampionId),
    FOREIGN KEY (ResourceId) REFERENCES Resource (Id)
);
CREATE TABLE GameState (

    StateId INT PRIMARY KEY,

    State VARCHAR(50)

);
CREATE TABLE Player (

    PlayerId INTEGER PRIMARY KEY,

    PlayerName VARCHAR(50) NOT NULL

);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE Room (

    RoomUID TEXT PRIMARY KEY not null unique  -- unique UUID stored as text

, TurnTime INTEGER, StealsEnabled BOOLEAN, IsPublic BOOLEAN DEFAULT FALSE, CreatedAt TIMESTAMP);
CREATE TABLE GamePlayer (

    Id INTEGER PRIMARY KEY AUTOINCREMENT,

    RoomUID TEXT NOT NULL,

    PlayerUID TEXT NOT NULL,

    PlayerId INTEGER NOT NULL, Steals INTEGER,



    FOREIGN KEY (RoomUID) REFERENCES Room(RoomUID),

    FOREIGN KEY (PlayerId) REFERENCES Player(PlayerId)

);
CREATE TABLE Game (

	Id INTEGER PRIMARY KEY AUTOINCREMENT,

	RoomUID TEXT NOT NULL,

	BoardState TEXT NOT NULL,

	CurrentTurnId INTEGER NOT NULL,

	StatusId INTEGER NOT NULL,

	WinnerId INTEGER,

	CreatedAt TEXT DEFAULT (datetime('now')) NOT NULL,

	UpdatedAt TEXT DEFAULT (datetime('now')) NOT NULL,

	Categories TEXT NOT NULL,

	DrawRequestedId INTEGER,

	CONSTRAINT FK_Game_GameState FOREIGN KEY (StatusId) REFERENCES GameState(StateId),

	CONSTRAINT FK_Game_Player_2 FOREIGN KEY (WinnerId) REFERENCES Player(PlayerId),

	CONSTRAINT FK_Game_Player_3 FOREIGN KEY (CurrentTurnId) REFERENCES Player(PlayerId),

	CONSTRAINT FK_Game_Player_5 FOREIGN KEY (DrawRequestedId) REFERENCES Player(PlayerId),

	CONSTRAINT FK_Game_Room_6 FOREIGN KEY (RoomUID) REFERENCES Room(RoomUID)

);

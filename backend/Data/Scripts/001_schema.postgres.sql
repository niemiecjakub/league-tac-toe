CREATE TABLE "Champion" (
    "ChampionId" SERIAL PRIMARY KEY,
    "ChampionKey" VARCHAR UNIQUE,
    "Name" VARCHAR UNIQUE,
    "Title" VARCHAR UNIQUE,
    "ImageUrl" VARCHAR UNIQUE
);

CREATE TABLE "Legacy" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR UNIQUE
);

CREATE TABLE "Position" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR UNIQUE
);

CREATE TABLE "RangeType" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR UNIQUE
);

CREATE TABLE "Region" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR UNIQUE
);

CREATE TABLE "Resource" (
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR UNIQUE
);

CREATE TABLE "ChampionLegacy" (
    "ChampionId" INTEGER NOT NULL,
    "LegacyId" INTEGER NOT NULL,
    FOREIGN KEY ("ChampionId") REFERENCES "Champion" ("ChampionId"),
    FOREIGN KEY ("LegacyId") REFERENCES "Legacy" ("Id"),
    PRIMARY KEY ("ChampionId", "LegacyId")
);

CREATE TABLE "ChampionPosition" (
    "ChampionId" INTEGER NOT NULL,
    "PositionId" INTEGER NOT NULL,
    FOREIGN KEY ("ChampionId") REFERENCES "Champion" ("ChampionId"),
    FOREIGN KEY ("PositionId") REFERENCES "Position" ("Id"),
    PRIMARY KEY ("ChampionId", "PositionId")
);

CREATE TABLE "ChampionRangeType" (
    "ChampionId" INTEGER NOT NULL,
    "RangeTypeId" INTEGER NOT NULL,
    FOREIGN KEY ("ChampionId") REFERENCES "Champion" ("ChampionId"),
    FOREIGN KEY ("RangeTypeId") REFERENCES "RangeType" ("Id"),
    PRIMARY KEY ("ChampionId", "RangeTypeId")
);

CREATE TABLE "ChampionRegion" (
    "ChampionId" INTEGER NOT NULL,
    "RegionId" INTEGER NOT NULL,
    FOREIGN KEY ("ChampionId") REFERENCES "Champion" ("ChampionId"),
    FOREIGN KEY ("RegionId") REFERENCES "Region" ("Id"),
    PRIMARY KEY ("ChampionId", "RegionId")
);

CREATE TABLE "ChampionResource" (
    "ChampionId" INTEGER NOT NULL,
    "ResourceId" INTEGER NOT NULL,
    FOREIGN KEY ("ChampionId") REFERENCES "Champion" ("ChampionId"),
    FOREIGN KEY ("ResourceId") REFERENCES "Resource" ("Id"),
    PRIMARY KEY ("ChampionId", "ResourceId")
);

CREATE TABLE "GameState" (
    "StateId" SERIAL PRIMARY KEY,
    "State" VARCHAR(50)
);

CREATE TABLE "Player" (
    "PlayerId" SERIAL PRIMARY KEY,
    "PlayerName" VARCHAR(50) NOT NULL
);

CREATE TABLE "Room" (
    "RoomUID" TEXT PRIMARY KEY NOT NULL UNIQUE,  -- unique UUID stored as text
    "TurnTime" INTEGER,
    "StealsEnabled" BOOLEAN,
    "IsPublic" BOOLEAN DEFAULT FALSE,
    "CreatedAt" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "GamePlayer" (
    "Id" SERIAL PRIMARY KEY,
    "RoomUID" TEXT NOT NULL,
    "PlayerUID" TEXT NOT NULL,
    "PlayerId" INTEGER NOT NULL,
    "Steals" INTEGER,
    FOREIGN KEY ("RoomUID") REFERENCES "Room"("RoomUID"),
    FOREIGN KEY ("PlayerId") REFERENCES "Player"("PlayerId")
);

CREATE TABLE "Game" (
    "Id" SERIAL PRIMARY KEY,
    "RoomUID" TEXT NOT NULL,
    "BoardState" TEXT NOT NULL,
    "CurrentTurnId" INTEGER NOT NULL,
    "StatusId" INTEGER NOT NULL,
    "WinnerId" INTEGER,
    "CreatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "UpdatedAt" TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    "Categories" TEXT NOT NULL,
    "DrawRequestedId" INTEGER,
    CONSTRAINT "FK_Game_GameState" FOREIGN KEY ("StatusId") REFERENCES "GameState"("StateId"),
    CONSTRAINT "FK_Game_Player_2" FOREIGN KEY ("WinnerId") REFERENCES "Player"("PlayerId"),
    CONSTRAINT "FK_Game_Player_3" FOREIGN KEY ("CurrentTurnId") REFERENCES "Player"("PlayerId"),
    CONSTRAINT "FK_Game_Player_5" FOREIGN KEY ("DrawRequestedId") REFERENCES "Player"("PlayerId"),
    CONSTRAINT "FK_Game_Room_6" FOREIGN KEY ("RoomUID") REFERENCES "Room"("RoomUID")
);

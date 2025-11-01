
CREATE TABLE  "EsportLeague" (
	"Id" serial4 NOT NULL,
	"Name" varchar(255) NOT NULL,
	CONSTRAINT "EsportLeague_pkey" PRIMARY KEY ("Id")
);


CREATE TABLE  "EsportTeam" (
	"Id" serial4 NOT NULL,
	"Name" varchar(255) NOT NULL,
	CONSTRAINT "EsportTeam_pkey" PRIMARY KEY ("Id")
);


CREATE TABLE  "EsportPlayer" (
	"Id" serial4 NOT NULL,
	"Name" varchar(255) NOT NULL,
	"MostPlayedPositionId" int4 NOT NULL,
	CONSTRAINT "EsportPlayer_pkey" PRIMARY KEY ("Id"),
	CONSTRAINT fk_mostplayedposition FOREIGN KEY ("MostPlayedPositionId") REFERENCES  "Position"("Id") ON DELETE CASCADE
);

CREATE TABLE  "EsportGame" (
	"Id" varchar(255) NOT NULL,
	"Patch" varchar(255) NULL,
	"Date" timestamp NOT NULL,
	"Year" int4 NOT NULL,
	"Split" varchar(100) NULL,
	"LeagueId" int4 NOT NULL,
	CONSTRAINT "EsportGame_pkey" PRIMARY KEY ("Id"),
	CONSTRAINT fk_league FOREIGN KEY ("LeagueId") REFERENCES  "EsportLeague"("Id") ON DELETE CASCADE
);

CREATE TABLE  "EsportBan" (
	"GameId" varchar(255) NOT NULL,
	"TeamId" int4 NOT NULL,
	"ChampionId" int4 NOT NULL,
	CONSTRAINT pk_esportban PRIMARY KEY ("GameId", "TeamId", "ChampionId"),
	CONSTRAINT fk_champion FOREIGN KEY ("ChampionId") REFERENCES  "Champion"("ChampionId") ON DELETE CASCADE,
	CONSTRAINT fk_game FOREIGN KEY ("GameId") REFERENCES  "EsportGame"("Id") ON DELETE CASCADE,
	CONSTRAINT fk_team FOREIGN KEY ("TeamId") REFERENCES  "EsportTeam"("Id") ON DELETE CASCADE
);


CREATE TABLE  "EsportPick" (
	"GameId" varchar(255) NOT NULL,
	"TeamId" int4 NOT NULL,
	"ChampionId" int4 NOT NULL,
	"PositionId" int4 NOT NULL,
	"PlayerId" int4 NOT NULL,
	"Side" varchar(10) NOT NULL,
	"Victory" bool NOT NULL,
	CONSTRAINT pk_esportpick PRIMARY KEY ("GameId", "TeamId", "PlayerId", "ChampionId", "PositionId"),
	CONSTRAINT fk_champion FOREIGN KEY ("ChampionId") REFERENCES  "Champion"("ChampionId") ON DELETE CASCADE,
	CONSTRAINT fk_game FOREIGN KEY ("GameId") REFERENCES  "EsportGame"("Id") ON DELETE CASCADE,
	CONSTRAINT fk_player FOREIGN KEY ("PlayerId") REFERENCES  "EsportPlayer"("Id") ON DELETE CASCADE,
	CONSTRAINT fk_position FOREIGN KEY ("PositionId") REFERENCES  "Position"("Id") ON DELETE CASCADE,
	CONSTRAINT fk_team FOREIGN KEY ("TeamId") REFERENCES  "EsportTeam"("Id") ON DELETE CASCADE
);

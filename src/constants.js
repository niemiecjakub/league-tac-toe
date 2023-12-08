export const CHAMPION_API_URL = "https://kniemiec.pythonanywhere.com/api/";

// export const CHAMPION_API_URL = "http://127.0.0.1:8000/api/"

export const overlayStyle = { background: "rgba(0,0,0,0.65)" };

export const INITIAL_STATE = {
  opponentLeft: false,
  winner: "",
  roomId: "",
  gameMode: "",
  isGameOver: false,
  isLoadingGame: true,
  isGameStarted: false,
  stealsEnabled: true,
  isOpenForRandom: false,
  playersJoined: [],
  player1: {
    key: "player1",
    name: "Player 1",
    alias: "P 1",
    fields: [],
    steals: 3,
    score: 0,
    requestDraw: false,
    requestNewGame: false,
  },
  player2: {
    key: "player2",
    name: "Player 2",
    alias: "P 2",
    fields: [],
    steals: 3,
    score: 0,
    requestDraw: false,
    requestNewGame: false,
  },
  currentPlayer: {
    name: "Player 1",
    alias: "P 1",
    fields: [],
    steals: 3,
    score: 0,
  },
  gameFields: [],
  possibleFields: [1, 2, 3, 4, 5, 6, 7, 8],
  categoryFields: {
    horizontal: [],
    vertical: [],
  },
  fields: {
    1: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
    2: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
    3: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
    4: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
    5: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
    6: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
    7: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
    8: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
    9: {
      name: "",
      key: "",
      player: "",
      history: [],
    },
  },
};

export const COMPARE_ARRAYS = (a, b) => {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
};

export const GENERATE_CODE = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const CHAMPION_NAME_LIST = [
  "Aatrox",
  "Ahri",
  "Akali",
  "Akshan",
  "Alistar",
  "Amumu",
  "Anivia",
  "Annie",
  "Aphelios",
  "Ashe",
  "Aurelion sol",
  "Azir",
  "Bard",
  "Bel'veth",
  "Blitzcrank",
  "Brand",
  "Braum",
  "Briar",
  "Caitlyn",
  "Camille",
  "Cassiopeia",
  "Cho'gath",
  "Corki",
  "Darius",
  "Diana",
  "Draven",
  "Dr. mundo",
  "Ekko",
  "Elise",
  "Evelynn",
  "Ezreal",
  "Fiddlesticks",
  "Fiora",
  "Fizz",
  "Galio",
  "Gangplank",
  "Garen",
  "Gnar",
  "Gragas",
  "Graves",
  "Gwen",
  "Hecarim",
  "Heimerdinger",
  "Illaoi",
  "Irelia",
  "Ivern",
  "Janna",
  "Jarvan iv",
  "Jax",
  "Jayce",
  "Jhin",
  "Jinx",
  "Kai'sa",
  "Kalista",
  "Karma",
  "Karthus",
  "Kassadin",
  "Katarina",
  "Kayle",
  "Kayn",
  "Kennen",
  "Kha'zix",
  "Kindred",
  "Kled",
  "Kog'maw",
  "K'sante",
  "Leblanc",
  "Lee sin",
  "Leona",
  "Lillia",
  "Lissandra",
  "Lucian",
  "Lulu",
  "Lux",
  "Malphite",
  "Malzahar",
  "Maokai",
  "Master yi",
  "Milio",
  "Miss fortune",
  "Wukong",
  "Mordekaiser",
  "Morgana",
  "Naafiri",
  "Nami",
  "Nasus",
  "Nautilus",
  "Neeko",
  "Nidalee",
  "Nilah",
  "Nocturne",
  "Nunu & willump",
  "Olaf",
  "Orianna",
  "Ornn",
  "Pantheon",
  "Poppy",
  "Pyke",
  "Qiyana",
  "Quinn",
  "Rakan",
  "Rammus",
  "Rek'sai",
  "Rell",
  "Renata glasc",
  "Renekton",
  "Rengar",
  "Riven",
  "Rumble",
  "Ryze",
  "Samira",
  "Sejuani",
  "Senna",
  "Seraphine",
  "Sett",
  "Shaco",
  "Shen",
  "Shyvana",
  "Singed",
  "Sion",
  "Sivir",
  "Skarner",
  "Sona",
  "Soraka",
  "Swain",
  "Sylas",
  "Syndra",
  "Tahm kench",
  "Taliyah",
  "Talon",
  "Taric",
  "Teemo",
  "Thresh",
  "Tristana",
  "Trundle",
  "Tryndamere",
  "Twisted fate",
  "Twitch",
  "Udyr",
  "Urgot",
  "Varus",
  "Vayne",
  "Veigar",
  "Vel'koz",
  "Vex",
  "Vi",
  "Viego",
  "Viktor",
  "Vladimir",
  "Volibear",
  "Warwick",
  "Xayah",
  "Xerath",
  "Xin zhao",
  "Yasuo",
  "Yone",
  "Yorick",
  "Yuumi",
  "Zac",
  "Zed",
  "Zeri",
  "Ziggs",
  "Zilean",
  "Zoe",
  "Zyra",
];

export const CATEGORY_LIST = {
  legacy: ["Mage", "Fighter", "Tank", "Assassin", "Marksman", "Support"],
  position: ["Top", "Support", "Jungle", "Bottom", "Middle"],
  rangetype: ["Melee", "Ranged"],
  region: [
    "The void",
    "Zaun",
    "Ionia",
    "Bandle city",
    "Freljord",
    "Piltover",
    "Shadow isles",
    "Bilgewater",
    "Noxus",
    "Ixtal",
    "Targon",
    "Demacia",
    "Runeterra",
    "Shurima",
  ],
  resource: ["Mana", "Manaless"],
};

export const WNNING_CONDITIONS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

export const ALL_CHAMPION_DATA = [
  {
    "id": 1,
    "key": "aatrox",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Aatrox",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Darkin Blade"
  },
  {
    "id": 2,
    "key": "ahri",
    "legacy": [
      "Mage",
      "Assassin"
    ],
    "name": "Ahri",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Nine-Tailed Fox"
  },
  {
    "id": 3,
    "key": "akali",
    "legacy": [
      "Assassin"
    ],
    "name": "Akali",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Rogue Assassin"
  },
  {
    "id": 4,
    "key": "akshan",
    "legacy": [
      "Assassin",
      "Marksman"
    ],
    "name": "Akshan",
    "position": [
      "Top",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Rogue Sentinel"
  },
  {
    "id": 5,
    "key": "alistar",
    "legacy": [
      "Tank",
      "Support"
    ],
    "name": "Alistar",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Minotaur"
  },
  {
    "id": 6,
    "key": "amumu",
    "legacy": [
      "Mage",
      "Tank"
    ],
    "name": "Amumu",
    "position": [
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Sad Mummy"
  },
  {
    "id": 7,
    "key": "anivia",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Anivia",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Cryophoenix"
  },
  {
    "id": 8,
    "key": "annie",
    "legacy": [
      "Mage"
    ],
    "name": "Annie",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Dark Child"
  },
  {
    "id": 9,
    "key": "aphelios",
    "legacy": [
      "Marksman"
    ],
    "name": "Aphelios",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Targon"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Weapon of the Faithful"
  },
  {
    "id": 10,
    "key": "ashe",
    "legacy": [
      "Marksman",
      "Support"
    ],
    "name": "Ashe",
    "position": [
      "Support",
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Frost Archer"
  },
  {
    "id": 11,
    "key": "aurelionsol",
    "legacy": [
      "Mage"
    ],
    "name": "Aurelion sol",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The Star Forger"
  },
  {
    "id": 12,
    "key": "azir",
    "legacy": [
      "Mage",
      "Marksman"
    ],
    "name": "Azir",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Emperor of the Sands"
  },
  {
    "id": 13,
    "key": "bard",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Bard",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Wandering Caretaker"
  },
  {
    "id": 14,
    "key": "belveth",
    "legacy": [
      "Fighter"
    ],
    "name": "Bel'veth",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Empress of the Void"
  },
  {
    "id": 15,
    "key": "blitzcrank",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Blitzcrank",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Great Steam Golem"
  },
  {
    "id": 16,
    "key": "brand",
    "legacy": [
      "Mage"
    ],
    "name": "Brand",
    "position": [
      "Support",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Burning Vengeance"
  },
  {
    "id": 17,
    "key": "braum",
    "legacy": [
      "Tank",
      "Support"
    ],
    "name": "Braum",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Heart of the Freljord"
  },
  {
    "id": 18,
    "key": "briar",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Briar",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Restrained Hunger"
  },
  {
    "id": 19,
    "key": "caitlyn",
    "legacy": [
      "Marksman"
    ],
    "name": "Caitlyn",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Piltover"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Sheriff of Piltover"
  },
  {
    "id": 20,
    "key": "camille",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Camille",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Piltover"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Steel Shadow"
  },
  {
    "id": 21,
    "key": "cassiopeia",
    "legacy": [
      "Mage"
    ],
    "name": "Cassiopeia",
    "position": [
      "Top",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Serpent's Embrace"
  },
  {
    "id": 22,
    "key": "chogath",
    "legacy": [
      "Mage",
      "Tank"
    ],
    "name": "Cho'gath",
    "position": [
      "Top",
      "Support",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Terror of the Void"
  },
  {
    "id": 23,
    "key": "corki",
    "legacy": [
      "Marksman"
    ],
    "name": "Corki",
    "position": [
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bandle city"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Daring Bombardier"
  },
  {
    "id": 24,
    "key": "darius",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Darius",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Hand of Noxus"
  },
  {
    "id": 25,
    "key": "diana",
    "legacy": [
      "Mage",
      "Fighter"
    ],
    "name": "Diana",
    "position": [
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Targon"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Scorn of the Moon"
  },
  {
    "id": 26,
    "key": "draven",
    "legacy": [
      "Marksman"
    ],
    "name": "Draven",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Glorious Executioner"
  },
  {
    "id": 27,
    "key": "drmundo",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Dr. mundo",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Madman of Zaun"
  },
  {
    "id": 28,
    "key": "ekko",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Ekko",
    "position": [
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Boy Who Shattered Time"
  },
  {
    "id": 29,
    "key": "elise",
    "legacy": [
      "Mage",
      "Fighter"
    ],
    "name": "Elise",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Spider Queen"
  },
  {
    "id": 30,
    "key": "evelynn",
    "legacy": [
      "Mage",
      "Assassin"
    ],
    "name": "Evelynn",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Agony's Embrace"
  },
  {
    "id": 31,
    "key": "ezreal",
    "legacy": [
      "Mage",
      "Marksman"
    ],
    "name": "Ezreal",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Piltover"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Prodigal Explorer"
  },
  {
    "id": 32,
    "key": "fiddlesticks",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Fiddlesticks",
    "position": [
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Ancient Fear"
  },
  {
    "id": 33,
    "key": "fiora",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Fiora",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Grand Duelist"
  },
  {
    "id": 34,
    "key": "fizz",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Fizz",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Tidal Trickster"
  },
  {
    "id": 35,
    "key": "galio",
    "legacy": [
      "Mage",
      "Tank"
    ],
    "name": "Galio",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Colossus"
  },
  {
    "id": 36,
    "key": "gangplank",
    "legacy": [
      "Fighter"
    ],
    "name": "Gangplank",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Bilgewater"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Saltwater Scourge"
  },
  {
    "id": 37,
    "key": "garen",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Garen",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "The Might of Demacia"
  },
  {
    "id": 38,
    "key": "gnar",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Gnar",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Missing Link"
  },
  {
    "id": 39,
    "key": "gragas",
    "legacy": [
      "Mage",
      "Fighter"
    ],
    "name": "Gragas",
    "position": [
      "Top",
      "Support",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Rabble Rouser"
  },
  {
    "id": 40,
    "key": "graves",
    "legacy": [
      "Marksman"
    ],
    "name": "Graves",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bilgewater"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Outlaw"
  },
  {
    "id": 41,
    "key": "gwen",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Gwen",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The Hallowed Seamstress"
  },
  {
    "id": 42,
    "key": "hecarim",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Hecarim",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Shadow of War"
  },
  {
    "id": 43,
    "key": "heimerdinger",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Heimerdinger",
    "position": [
      "Top",
      "Support",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Piltover"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Revered Inventor"
  },
  {
    "id": 44,
    "key": "illaoi",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Illaoi",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Bilgewater"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Kraken Priestess"
  },
  {
    "id": 45,
    "key": "irelia",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Irelia",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Blade Dancer"
  },
  {
    "id": 46,
    "key": "ivern",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Ivern",
    "position": [
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Green Father"
  },
  {
    "id": 47,
    "key": "janna",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Janna",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Storm's Fury"
  },
  {
    "id": 48,
    "key": "jarvaniv",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Jarvan iv",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Exemplar of Demacia"
  },
  {
    "id": 49,
    "key": "jax",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Jax",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Grandmaster at Arms"
  },
  {
    "id": 50,
    "key": "jayce",
    "legacy": [
      "Fighter",
      "Marksman"
    ],
    "name": "Jayce",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Piltover"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Defender of Tomorrow"
  },
  {
    "id": 51,
    "key": "jhin",
    "legacy": [
      "Mage",
      "Marksman"
    ],
    "name": "Jhin",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Virtuoso"
  },
  {
    "id": 52,
    "key": "jinx",
    "legacy": [
      "Marksman"
    ],
    "name": "Jinx",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Loose Cannon"
  },
  {
    "id": 53,
    "key": "kaisa",
    "legacy": [
      "Marksman"
    ],
    "name": "Kai'sa",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Daughter of the Void"
  },
  {
    "id": 54,
    "key": "kalista",
    "legacy": [
      "Marksman"
    ],
    "name": "Kalista",
    "position": [
      "Top",
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Spear of Vengeance"
  },
  {
    "id": 55,
    "key": "karma",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Karma",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Enlightened One"
  },
  {
    "id": 56,
    "key": "karthus",
    "legacy": [
      "Mage"
    ],
    "name": "Karthus",
    "position": [
      "Jungle",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Deathsinger"
  },
  {
    "id": 57,
    "key": "kassadin",
    "legacy": [
      "Mage",
      "Assassin"
    ],
    "name": "Kassadin",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Void Walker"
  },
  {
    "id": 58,
    "key": "katarina",
    "legacy": [
      "Mage",
      "Assassin"
    ],
    "name": "Katarina",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Sinister Blade"
  },
  {
    "id": 59,
    "key": "kayle",
    "legacy": [
      "Fighter",
      "Support"
    ],
    "name": "Kayle",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Righteous"
  },
  {
    "id": 60,
    "key": "kayn",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Kayn",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Shadow Reaper"
  },
  {
    "id": 61,
    "key": "kennen",
    "legacy": [
      "Mage",
      "Marksman"
    ],
    "name": "Kennen",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Heart of the Tempest"
  },
  {
    "id": 62,
    "key": "khazix",
    "legacy": [
      "Assassin"
    ],
    "name": "Kha'zix",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Voidreaver"
  },
  {
    "id": 63,
    "key": "kindred",
    "legacy": [
      "Marksman"
    ],
    "name": "Kindred",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The Eternal Hunters"
  },
  {
    "id": 64,
    "key": "kled",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Kled",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Cantankerous Cavalier"
  },
  {
    "id": 65,
    "key": "kogmaw",
    "legacy": [
      "Mage",
      "Marksman"
    ],
    "name": "Kog'maw",
    "position": [
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Mouth of the Abyss"
  },
  {
    "id": 66,
    "key": "ksante",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "K'sante",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Pride of Nazumah"
  },
  {
    "id": 67,
    "key": "leblanc",
    "legacy": [
      "Mage",
      "Assassin"
    ],
    "name": "Leblanc",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Deceiver"
  },
  {
    "id": 68,
    "key": "leesin",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Lee sin",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Blind Monk"
  },
  {
    "id": 69,
    "key": "leona",
    "legacy": [
      "Tank",
      "Support"
    ],
    "name": "Leona",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Targon"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Radiant Dawn"
  },
  {
    "id": 70,
    "key": "lillia",
    "legacy": [
      "Mage",
      "Fighter"
    ],
    "name": "Lillia",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Bashful Bloom"
  },
  {
    "id": 71,
    "key": "lissandra",
    "legacy": [
      "Mage"
    ],
    "name": "Lissandra",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Ice Witch"
  },
  {
    "id": 72,
    "key": "lucian",
    "legacy": [
      "Marksman"
    ],
    "name": "Lucian",
    "position": [
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Purifier"
  },
  {
    "id": 73,
    "key": "lulu",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Lulu",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bandle city"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Fae Sorceress"
  },
  {
    "id": 74,
    "key": "lux",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Lux",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Lady of Luminosity"
  },
  {
    "id": 75,
    "key": "malphite",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Malphite",
    "position": [
      "Top",
      "Support",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ixtal"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Shard of the Monolith"
  },
  {
    "id": 76,
    "key": "malzahar",
    "legacy": [
      "Mage",
      "Assassin"
    ],
    "name": "Malzahar",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Prophet of the Void"
  },
  {
    "id": 77,
    "key": "maokai",
    "legacy": [
      "Mage",
      "Tank"
    ],
    "name": "Maokai",
    "position": [
      "Top",
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Twisted Treant"
  },
  {
    "id": 78,
    "key": "masteryi",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Master yi",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Wuju Bladesman"
  },
  {
    "id": 79,
    "key": "milio",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Milio",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ixtal"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The Gentle Flame"
  },
  {
    "id": 80,
    "key": "missfortune",
    "legacy": [
      "Marksman"
    ],
    "name": "Miss fortune",
    "position": [
      "Support",
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bilgewater"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Bounty Hunter"
  },
  {
    "id": 81,
    "key": "monkeyking",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Wukong",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Monkey King"
  },
  {
    "id": 82,
    "key": "mordekaiser",
    "legacy": [
      "Fighter"
    ],
    "name": "Mordekaiser",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Iron Revenant"
  },
  {
    "id": 83,
    "key": "morgana",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Morgana",
    "position": [
      "Support",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Fallen"
  },
  {
    "id": 84,
    "key": "naafiri",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Naafiri",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Hound of a Hundred Bites"
  },
  {
    "id": 85,
    "key": "nami",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Nami",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Tidecaller"
  },
  {
    "id": 86,
    "key": "nasus",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Nasus",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Curator of the Sands"
  },
  {
    "id": 87,
    "key": "nautilus",
    "legacy": [
      "Tank",
      "Support"
    ],
    "name": "Nautilus",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Bilgewater"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Titan of the Depths"
  },
  {
    "id": 88,
    "key": "neeko",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Neeko",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ixtal"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Curious Chameleon"
  },
  {
    "id": 89,
    "key": "nidalee",
    "legacy": [
      "Mage",
      "Assassin"
    ],
    "name": "Nidalee",
    "position": [
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ixtal"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Bestial Huntress"
  },
  {
    "id": 90,
    "key": "nilah",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Nilah",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Bilgewater"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Joy Unbound"
  },
  {
    "id": 91,
    "key": "nocturne",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Nocturne",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Eternal Nightmare"
  },
  {
    "id": 92,
    "key": "nunu",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Nunu & willump",
    "position": [
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Boy and His Yeti"
  },
  {
    "id": 93,
    "key": "olaf",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Olaf",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Berserker"
  },
  {
    "id": 94,
    "key": "orianna",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Orianna",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Piltover"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Lady of Clockwork"
  },
  {
    "id": 95,
    "key": "ornn",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Ornn",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The Fire below the Mountain"
  },
  {
    "id": 96,
    "key": "pantheon",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Pantheon",
    "position": [
      "Top",
      "Support",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Targon"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Unbreakable Spear"
  },
  {
    "id": 97,
    "key": "poppy",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Poppy",
    "position": [
      "Top",
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Keeper of the Hammer"
  },
  {
    "id": 98,
    "key": "pyke",
    "legacy": [
      "Assassin",
      "Support"
    ],
    "name": "Pyke",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Bilgewater"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Bloodharbor Ripper"
  },
  {
    "id": 99,
    "key": "qiyana",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Qiyana",
    "position": [
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ixtal"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Empress of the Elements"
  },
  {
    "id": 100,
    "key": "quinn",
    "legacy": [
      "Assassin",
      "Marksman"
    ],
    "name": "Quinn",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Demacia's Wings"
  },
  {
    "id": 101,
    "key": "rakan",
    "legacy": [
      "Support"
    ],
    "name": "Rakan",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The Charmer"
  },
  {
    "id": 102,
    "key": "rammus",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Rammus",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Armordillo"
  },
  {
    "id": 103,
    "key": "reksai",
    "legacy": [
      "Fighter"
    ],
    "name": "Rek'sai",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Void Burrower"
  },
  {
    "id": 104,
    "key": "rell",
    "legacy": [
      "Tank",
      "Support"
    ],
    "name": "Rell",
    "position": [
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Iron Maiden"
  },
  {
    "id": 105,
    "key": "renata",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Renata glasc",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Chem-Baroness"
  },
  {
    "id": 106,
    "key": "renekton",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Renekton",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Butcher of the Sands"
  },
  {
    "id": 107,
    "key": "rengar",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Rengar",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ixtal"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Pridestalker"
  },
  {
    "id": 108,
    "key": "riven",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Riven",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Exile"
  },
  {
    "id": 109,
    "key": "rumble",
    "legacy": [
      "Mage",
      "Fighter"
    ],
    "name": "Rumble",
    "position": [
      "Top",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Bandle city"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Mechanized Menace"
  },
  {
    "id": 110,
    "key": "ryze",
    "legacy": [
      "Mage",
      "Fighter"
    ],
    "name": "Ryze",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Rune Mage"
  },
  {
    "id": 111,
    "key": "samira",
    "legacy": [
      "Marksman"
    ],
    "name": "Samira",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Desert Rose"
  },
  {
    "id": 112,
    "key": "sejuani",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Sejuani",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Fury of the North"
  },
  {
    "id": 113,
    "key": "senna",
    "legacy": [
      "Marksman",
      "Support"
    ],
    "name": "Senna",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Redeemer"
  },
  {
    "id": 114,
    "key": "seraphine",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Seraphine",
    "position": [
      "Support",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Piltover"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Starry-Eyed Songstress"
  },
  {
    "id": 115,
    "key": "sett",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Sett",
    "position": [
      "Top",
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Boss"
  },
  {
    "id": 116,
    "key": "shaco",
    "legacy": [
      "Assassin"
    ],
    "name": "Shaco",
    "position": [
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Demon Jester"
  },
  {
    "id": 117,
    "key": "shen",
    "legacy": [
      "Tank"
    ],
    "name": "Shen",
    "position": [
      "Top",
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Eye of Twilight"
  },
  {
    "id": 118,
    "key": "shyvana",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Shyvana",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Half-Dragon"
  },
  {
    "id": 119,
    "key": "singed",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Singed",
    "position": [
      "Top",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Mad Chemist"
  },
  {
    "id": 120,
    "key": "sion",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Sion",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The Undead Juggernaut"
  },
  {
    "id": 121,
    "key": "sivir",
    "legacy": [
      "Marksman"
    ],
    "name": "Sivir",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Battle Mistress"
  },
  {
    "id": 122,
    "key": "skarner",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Skarner",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Crystal Vanguard"
  },
  {
    "id": 123,
    "key": "sona",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Sona",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Maven of the Strings"
  },
  {
    "id": 124,
    "key": "soraka",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Soraka",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Targon"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Starchild"
  },
  {
    "id": 125,
    "key": "swain",
    "legacy": [
      "Mage",
      "Fighter"
    ],
    "name": "Swain",
    "position": [
      "Top",
      "Support",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Noxian Grand General"
  },
  {
    "id": 126,
    "key": "sylas",
    "legacy": [
      "Mage",
      "Assassin"
    ],
    "name": "Sylas",
    "position": [
      "Top",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Unshackled"
  },
  {
    "id": 127,
    "key": "syndra",
    "legacy": [
      "Mage"
    ],
    "name": "Syndra",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Dark Sovereign"
  },
  {
    "id": 128,
    "key": "tahmkench",
    "legacy": [
      "Tank",
      "Support"
    ],
    "name": "Tahm kench",
    "position": [
      "Top",
      "Support",
      "Bottom"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The River King"
  },
  {
    "id": 129,
    "key": "taliyah",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Taliyah",
    "position": [
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Stoneweaver"
  },
  {
    "id": 130,
    "key": "talon",
    "legacy": [
      "Assassin"
    ],
    "name": "Talon",
    "position": [
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Blade's Shadow"
  },
  {
    "id": 131,
    "key": "taric",
    "legacy": [
      "Fighter",
      "Support"
    ],
    "name": "Taric",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Targon"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Shield of Valoran"
  },
  {
    "id": 132,
    "key": "teemo",
    "legacy": [
      "Assassin",
      "Marksman"
    ],
    "name": "Teemo",
    "position": [
      "Top",
      "Support",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bandle city"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Swift Scout"
  },
  {
    "id": 133,
    "key": "thresh",
    "legacy": [
      "Fighter",
      "Support"
    ],
    "name": "Thresh",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Chain Warden"
  },
  {
    "id": 134,
    "key": "tristana",
    "legacy": [
      "Assassin",
      "Marksman"
    ],
    "name": "Tristana",
    "position": [
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bandle city"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Yordle Gunner"
  },
  {
    "id": 135,
    "key": "trundle",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Trundle",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Troll King"
  },
  {
    "id": 136,
    "key": "tryndamere",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Tryndamere",
    "position": [
      "Top",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Barbarian King"
  },
  {
    "id": 137,
    "key": "twistedfate",
    "legacy": [
      "Mage"
    ],
    "name": "Twisted fate",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bilgewater"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Card Master"
  },
  {
    "id": 138,
    "key": "twitch",
    "legacy": [
      "Assassin",
      "Marksman"
    ],
    "name": "Twitch",
    "position": [
      "Support",
      "Jungle",
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Plague Rat"
  },
  {
    "id": 139,
    "key": "udyr",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Udyr",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Spirit Walker"
  },
  {
    "id": 140,
    "key": "urgot",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Urgot",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Dreadnought"
  },
  {
    "id": 141,
    "key": "varus",
    "legacy": [
      "Mage",
      "Marksman"
    ],
    "name": "Varus",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Arrow of Retribution"
  },
  {
    "id": 142,
    "key": "vayne",
    "legacy": [
      "Assassin",
      "Marksman"
    ],
    "name": "Vayne",
    "position": [
      "Top",
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Night Hunter"
  },
  {
    "id": 143,
    "key": "veigar",
    "legacy": [
      "Mage"
    ],
    "name": "Veigar",
    "position": [
      "Support",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bandle city"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Tiny Master of Evil"
  },
  {
    "id": 144,
    "key": "velkoz",
    "legacy": [
      "Mage"
    ],
    "name": "Vel'koz",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "The void"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Eye of the Void"
  },
  {
    "id": 145,
    "key": "vex",
    "legacy": [
      "Mage"
    ],
    "name": "Vex",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Gloomist"
  },
  {
    "id": 146,
    "key": "vi",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Vi",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Piltover"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Piltover Enforcer"
  },
  {
    "id": 147,
    "key": "viego",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Viego",
    "position": [
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "The Ruined King"
  },
  {
    "id": 148,
    "key": "viktor",
    "legacy": [
      "Mage"
    ],
    "name": "Viktor",
    "position": [
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Machine Herald"
  },
  {
    "id": 149,
    "key": "vladimir",
    "legacy": [
      "Mage"
    ],
    "name": "Vladimir",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Noxus"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Crimson Reaper"
  },
  {
    "id": 150,
    "key": "volibear",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Volibear",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Freljord"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Relentless Storm"
  },
  {
    "id": 151,
    "key": "warwick",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Warwick",
    "position": [
      "Top",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Uncaged Wrath of Zaun"
  },
  {
    "id": 152,
    "key": "xayah",
    "legacy": [
      "Marksman"
    ],
    "name": "Xayah",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Rebel"
  },
  {
    "id": 153,
    "key": "xerath",
    "legacy": [
      "Mage"
    ],
    "name": "Xerath",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Shurima"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Magus Ascendant"
  },
  {
    "id": 154,
    "key": "xinzhao",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Xin zhao",
    "position": [
      "Top",
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Demacia"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Seneschal of Demacia"
  },
  {
    "id": 155,
    "key": "yasuo",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Yasuo",
    "position": [
      "Top",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Unforgiven"
  },
  {
    "id": 156,
    "key": "yone",
    "legacy": [
      "Fighter",
      "Assassin"
    ],
    "name": "Yone",
    "position": [
      "Top",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Unforgotten"
  },
  {
    "id": 157,
    "key": "yorick",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Yorick",
    "position": [
      "Top"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Shadow isles"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Shepherd of Souls"
  },
  {
    "id": 158,
    "key": "yuumi",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Yuumi",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Bandle city"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Magical Cat"
  },
  {
    "id": 159,
    "key": "zac",
    "legacy": [
      "Fighter",
      "Tank"
    ],
    "name": "Zac",
    "position": [
      "Top",
      "Support",
      "Jungle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Secret Weapon"
  },
  {
    "id": 160,
    "key": "zed",
    "legacy": [
      "Assassin"
    ],
    "name": "Zed",
    "position": [
      "Jungle",
      "Middle"
    ],
    "rangetype": [
      "Melee"
    ],
    "region": [
      "Ionia"
    ],
    "resource": [
      "Manaless"
    ],
    "title": "the Master of Shadows"
  },
  {
    "id": 161,
    "key": "zeri",
    "legacy": [
      "Marksman"
    ],
    "name": "Zeri",
    "position": [
      "Bottom"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "The Spark of Zaun"
  },
  {
    "id": 162,
    "key": "ziggs",
    "legacy": [
      "Mage"
    ],
    "name": "Ziggs",
    "position": [
      "Support",
      "Bottom",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Zaun"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Hexplosives Expert"
  },
  {
    "id": 163,
    "key": "zilean",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Zilean",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Runeterra"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Chronokeeper"
  },
  {
    "id": 164,
    "key": "zoe",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Zoe",
    "position": [
      "Support",
      "Middle"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Targon"
    ],
    "resource": [
      "Mana"
    ],
    "title": "the Aspect of Twilight"
  },
  {
    "id": 165,
    "key": "zyra",
    "legacy": [
      "Mage",
      "Support"
    ],
    "name": "Zyra",
    "position": [
      "Support"
    ],
    "rangetype": [
      "Ranged"
    ],
    "region": [
      "Ixtal"
    ],
    "resource": [
      "Mana"
    ],
    "title": "Rise of the Thorns"
  }
]
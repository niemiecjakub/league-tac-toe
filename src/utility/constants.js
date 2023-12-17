import { ALL_CHAMPION_DATA } from "./jsonData";

export const CHAMPION_API_URL = "https://kniemiec.pythonanywhere.com/api/";

export const OVERLAY_STYLE = { background: "rgba(0,0,0,0.65)" };

export const TURN_TIME_OPTIONS = [
  { display: "unlimited", value: "unlimited" },
  { display: "15 sec", value: 15 },
  { display: "30 sec", value: 30 },
  { display: "45 sec", value: 45 },
  { display: "60 sec", value: 60 },
];

export const QUERY_INITIAL_STATE = {
  champions: ALL_CHAMPION_DATA,
  queries: [
    {
      id: 0,
      categoryType: "all",
      categoryName: "all",
    },
  ],
};

export const GAME_INITIAL_STATE = {
  turnTime: "unlimited",
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

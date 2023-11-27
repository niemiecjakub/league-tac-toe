import { createSlice, current } from "@reduxjs/toolkit";
const championList = [
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
    "Zyra"
    ]
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

const compareArrays = (a, b) => {
    return a.length === b.length && a.every((element, index) => element === b[index]);
}

const initialState = {
    gameMode : 'Same screen',
    championNamesList: championList,
    player1: {
        name: "Player 1",
        fields: [],
        steals:3,
        score: 0
    },
    player2 : {
        name: "Player 2",
        fields: [],
        steals:3,
        score: 0
    },
    currentPlayer: {
        name: "Player 1"
    },
    gameFields: [],
    possibleFields: new Array(8),
    categoryFields: {
        horizontal: [],
        vertical: []
    }
}

const GameSlice = createSlice({
    name: "Game",
    initialState,
    reducers: {
        setCurrentPlayer : (state, action) => {
            const nextPlayer = state.currentPlayer.name === "Player 1" ? state.player2 : state.player1
            state.currentPlayer = nextPlayer
        },
        setGameMode : (state, action) => {
            state.gameMode = action.payload
        },
        setHorizontalFields : (state, action) => {
            state.categoryFields.horizontal = action.payload
        },
        setVerticalFields : (state, action) => {
            state.categoryFields.vertical = action.payload
        },
        setGameFields : (state, action) => {
            state.gameFields = action.payload
        },
        setPossibleFields : (state, action) => {
            const {champions, fieldId} = action.payload
            state.possibleFields[fieldId] = champions
        },
        setPlayerField : (state, action) => {
            const {fieldId} = action.payload
            const currentPlayer = state.currentPlayer.name === "Player 1" ? state.player1 : state.player2
            const otherPlayer = state.currentPlayer.name === "Player 1" ? state.player2 : state.player1
            const index = otherPlayer.fields.indexOf(fieldId)
            if (index > -1) { 
                otherPlayer.fields.splice(index, 1);
                currentPlayer.steals -= 1;
            }
            currentPlayer.fields.push(fieldId)
        },
        checkWin: (state, action) => {
            const player = state.currentPlayer.name == "Player 1" ? state.player1 : state.player2
            const playerFieldsSorted = player.fields.toSorted();

            winningConditions.forEach(winningCondition => {
                if (compareArrays(winningCondition, playerFieldsSorted)) {
                    player.score += 1
                }
            })
        },
        endAsDraw: (state, action) => {
            state.player1 = {
                ...initialState.player1,
                score: state.player1.score + 1
            }
            state.player2 = {
                ...initialState.player2,
                score: state.player2.score + 1
            }
            state.currentPlayer = initialState.currentPlayer
        },
    }
}) 

export const {
    setCurrentPlayer, 
    setGameMode, 
    setHorizontalFields, 
    setVerticalFields, 
    setGameFields, 
    setPossibleFields,
    setPlayerField, 
    checkWin,
    endAsDraw } = GameSlice.actions

export default GameSlice.reducer

export const CHAMPION_API_URL = "https://kniemiec.pythonanywhere.com/api/"

// export const CHAMPION_API_URL = "http://127.0.0.1:8000/api/"

export const overlayStyle = { background: 'rgba(0,0,0,0.5)' };

export const INITIAL_STATE = {
    winner: "",
    roomId: "",
    gameMode: "",
    isGameOver : false,
    isLoadingGame : true,
    isGameStarted: false,
    playersJoined: [],
    player1: {
        key: "player1",
        name: "Player 1",
        alias: "P 1",
        fields: [],
        steals:3,
        score: 0
    },
    player2 : {
        key: "player2",
        name: "Player 2",
        alias: "P 2",
        fields: [],
        steals:3,
        score: 0
    },
    currentPlayer: {
        name: "Player 1",
        alias: "P 1",
        fields: [],
        steals:3,
        score: 0
    },
    gameFields: [],
    possibleFields: [1,2,3,4,5,6,7,8],
    categoryFields: {
        horizontal: [],
        vertical: []
    },
    fields: {
        "1" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
        "2" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
        "3" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
        "4" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
        "5" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
        "6" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
        "7" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
        "8" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
        "9" :{
            name: "",
            key: "",
            player: "",
            history: []
        },
    }
};

export const COMPARE_ARRAYS = (a, b) => {
    return a.length === b.length && a.every((element, index) => element === b[index]);
};

export const GENERATE_CODE = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
    "Zyra"
];
    
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
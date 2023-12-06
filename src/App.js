import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import OnlineGameLobby from "./routes/OnlineGameLobby";
import ChampionList from "./routes/CategoryList";
import CategoryList from "./routes/CategoryList";
import Game from "./routes/Game";
import Landing from "./routes/Landing";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-league-blue-600 font-league min-h-full">
        <div className="bg-league-blue-700 flex items-center justify-center h-16 text-league-gold-400 text-4xl font-black sticky z-50 font-league">
          <Link to="/">LEAGUE TAC TOE</Link>
        </div>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/lobby" element={<OnlineGameLobby />} />
            {/* <Route path="/champion-list" element={<ChampionList />} />
            <Route path="/category-list" element={<CategoryList />} /> */}
          <Route path="/game/same-screen" element={<Game gameMode="same screen" />} />
          <Route
            path="/game/room/:roomId"
            element={<Game gameMode="online" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

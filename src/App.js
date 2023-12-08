import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import OnlineGameLobby from "./routes/OnlineGameLobby";
import Game from "./routes/Game";
import Landing from "./routes/Landing";
import ChampionSearch from "./routes/ChampionSearch";
import LocalGameLobby from "./routes/LocalGameLobby";
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
          <Route path="/lobby/local" element={<LocalGameLobby />} />
          <Route path="/champions" element={<ChampionSearch />} />
          <Route
            path="/game/same-screen"
            element={<Game gameMode="same screen" />}
          />
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

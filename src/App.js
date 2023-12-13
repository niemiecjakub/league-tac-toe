import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import OnlineGameLobby from "./routes/OnlineGameLobby";
import Game from "./routes/Game";
import Landing from "./routes/Landing";
import ChampionSearch from "./routes/ChampionSearch";
import LocalGameLobby from "./routes/LocalGameLobby";
import ScrollToTop from "./components/ScrollToTop";
import ChampionInfo from "./routes/ChampionInfo";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <ScrollToTop />
      <div className="bg-league-blue-600 font-league min-h-full flex justify-start items-center flex-col">
        <div className="bg-league-blue-700 flex items-center justify-center h-16 text-league-gold-400 text-4xl font-black sticky z-50 font-league">
          <Link to="/">LEAGUE TAC TOE</Link>
        </div>
        <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/lobby" element={<OnlineGameLobby />} />
            <Route path="/lobby/local" element={<LocalGameLobby />} />
            <Route path="/champions" element={<ChampionSearch />} />
            <Route path="/champions/:championKey" element={<ChampionInfo />} />
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
      </div>
    </BrowserRouter>
  );
}

export default App;

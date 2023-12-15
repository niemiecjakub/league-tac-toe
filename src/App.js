import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import OnlineGameLobby from "./routes/OnlineGameLobby";
import Game from "./routes/Game";
import Landing from "./routes/Landing";
import ChampionSearch from "./routes/ChampionSearch";
import LocalGameLobby from "./routes/LocalGameLobby";
import ScrollToTop from "./components/ScrollToTop";
import ChampionInfo from "./routes/ChampionInfo";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <ScrollToTop />
      <div className="flex flex-col justify-between m-auto min-h-screen w-full bg-league-blue-600">
        <div className="font-league h-full flex justify-start items-center flex-col">
          <Navbar />
          <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/lobby" element={<OnlineGameLobby />} />
              <Route path="/lobby/local" element={<LocalGameLobby />} />
              <Route path="/champions" element={<ChampionSearch />} />
              <Route
                path="/champions/:championKey"
                element={<ChampionInfo />}
              />
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
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

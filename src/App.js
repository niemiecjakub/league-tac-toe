import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChampionList from './routes/ChampionList';
import Game from './routes/Game';
import GameRoom from './routes/GameRoom';
import Landing from './routes/Landing';

function App() {

  return (
    <BrowserRouter>
    <div className="bg-blue-500 flex items-center justify-center h-16 text-white text-2xl font-black sticky top-0 z-50">
      LEAGUE TAC TOE
    </div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/champion-list' element={<ChampionList />} />
        <Route path='/game' element={<Game />} />
        <Route path='/game/room/:roomCode' element={<GameRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
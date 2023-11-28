import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChampionList from './routes/ChampionList';
import Game from './routes/Game';
import GameRoom from './routes/GameRoom';
import Landing from './routes/Landing';

function App() {

  return (
    <BrowserRouter>
      <div className="bg-league-blue-700 flex items-center justify-center h-16 text-league-gold-400 text-2xl font-black sticky top-0 z-50">
        LEAGUE TAC TOE
      </div>
      <div className='bg-league-blue-600 min-h-full'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/champion-list' element={<ChampionList />} />
          <Route path='/game' element={<Game />} />
          <Route path='/game/room/:roomCode' element={<GameRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
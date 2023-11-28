import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ChampionList from './routes/ChampionList';
import CategoryList from './routes/CategoryList';
import Game from './routes/Game';
import GameRoom from './routes/GameRoom';
import Landing from './routes/Landing';
import Loading from './components/Loading';

function App() {

  return (
    <BrowserRouter>
      <div className="bg-league-blue-700 flex items-center justify-center h-16 text-league-gold-400 text-4xl font-black sticky top-0 z-50 font-league">
        <Link to="/">
          LEAGUE TAC TOE
        </Link>
      </div>
      <div className='bg-league-blue-600 min-h-full font-league'>
        <Routes>

          <Route path='/' element={<Landing />} />
          <Route path='/champion-list' element={<ChampionList />} />
          <Route path='/category-list' element={<CategoryList />} />
          <Route path='/game' element={<Game />} />
          <Route path='/game/room/:roomCode' element={<GameRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
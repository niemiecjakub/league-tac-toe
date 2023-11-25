import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css'
import ChampionList from './routes/ChampionList';
import Game from './routes/Game';
import Landing from './routes/Landing';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/champion-list' element={<ChampionList />} />
        <Route path='/game' element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
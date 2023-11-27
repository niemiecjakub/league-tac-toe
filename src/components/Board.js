import GameField from './GameField';
import CategoryField from './CategoryField'
import '../styles/App.css'
import { useSelector } from 'react-redux'

function Board() {
  const {categoryFields: {horizontal, vertical}, gameFields} = useSelector(state => state.GameReducer)
  
  return (
    <div className='game-board'>
      <div className='game-row'>
        <div className="square"></div>
        <CategoryField categoryInfo={horizontal[0]}/>
        <CategoryField categoryInfo={horizontal[1]}/>
        <CategoryField categoryInfo={horizontal[2]}/>
      </div>
      <div className='game-row'>
        <CategoryField categoryInfo={vertical[0]}/>
        <GameField id={0} cat={gameFields[0]} />
        <GameField id={1} cat={gameFields[1]} />
        <GameField id={2} cat={gameFields[2]} />
      </div>
      <div className='game-row'>
        <CategoryField categoryInfo={vertical[1]}/>
        <GameField id={3} cat={gameFields[3]} />
        <GameField id={4} cat={gameFields[4]} />
        <GameField id={5} cat={gameFields[5]} />
      </div>
      <div className='game-row'>
        <CategoryField categoryInfo={vertical[2]}/>
        <GameField id={6} cat={gameFields[6]} />
        <GameField id={7} cat={gameFields[7]} />
        <GameField id={8} cat={gameFields[8]} />
      </div>
    </div>
  )
}

export default Board;

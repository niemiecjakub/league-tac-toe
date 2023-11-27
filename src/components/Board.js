import GameField from './GameField';
import CategoryField from './CategoryField'
import '../styles/App.css'
import { useSelector } from 'react-redux'

function Board() {
  
  const {categoryFields: {horizontal, vertical}} = useSelector(state => state.GameReducer)
  
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
        <GameField fieldId={0} />
        <GameField fieldId={1} />
        <GameField fieldId={2} />
      </div>
      <div className='game-row'>
        <CategoryField categoryInfo={vertical[1]}/>
        <GameField fieldId={3} />
        <GameField fieldId={4} />
        <GameField fieldId={5} />
      </div>
      <div className='game-row'>
        <CategoryField categoryInfo={vertical[2]}/>
        <GameField fieldId={6} />
        <GameField fieldId={7} />
        <GameField fieldId={8} />
      </div>
    </div>
  )
}

export default Board;

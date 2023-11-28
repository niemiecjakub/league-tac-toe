import GameField from './GameField';
import CategoryField from './CategoryField'
import { useSelector } from 'react-redux'
import useWindowDimensions from '../hooks/useWindwResize'

function Board() {

  const {categoryFields: {horizontal, vertical}} = useSelector(state => state.GameReducer)
  const { height, width } = useWindowDimensions();

  return (
  <div className='w-full flex flex-col' style={{height: `${width}px`}}>
    <div className='bg-green-300 flex h-full'>
    <div className="w-1/4 via-fuchsia-500">
      <p>s</p>
    </div>
      <CategoryField categoryInfo={horizontal[0]}/>
      <CategoryField categoryInfo={horizontal[1]}/>
      <CategoryField categoryInfo={horizontal[2]}/>
    </div>
    <div className='bg-green-200 flex h-full'>
      <CategoryField categoryInfo={vertical[0]}/>
      <GameField fieldId={0} />
      <GameField fieldId={1} />
      <GameField fieldId={2} />
    </div>
    <div className='bg-green-400 flex h-full'>
      <CategoryField categoryInfo={vertical[1]}/>
      <GameField fieldId={3} />
      <GameField fieldId={4} />
      <GameField fieldId={5} />
    </div>
    <div className='bg-green-100 flex h-full'>
      <CategoryField categoryInfo={vertical[2]}/>
      <GameField fieldId={6} />
      <GameField fieldId={7} />
      <GameField fieldId={8} />
    </div>
  </div>

  )
}

export default Board;


import { useSelector } from 'react-redux'
import useWindowDimensions from '../../hooks/useWindwResize'
import CategoryFieldOnline from './CategoryFieldOnline'
import GameFieldOnline from './GameFieldOnline'

function BoardOnline() {

  const {categoryFields: {horizontal, vertical}} = useSelector(state => state.online)
  const { height, width } = useWindowDimensions();


  return (
  <div className='w-full flex flex-col' style={{height: `${width}px`}}>
    <div className='bg-league-grey-200 flex'>
      <div className="w-1/4">
        <img src="images/lolIcon.svg" className='h-full w-full'/>
      </div>
      <CategoryFieldOnline categoryInfo={horizontal[0]}/>
      <CategoryFieldOnline categoryInfo={horizontal[1]}/>
      <CategoryFieldOnline categoryInfo={horizontal[2]}/>
    </div>
    <div className='bg-league-grey-200 flex'>
      <CategoryFieldOnline categoryInfo={vertical[0]}/>
      <GameFieldOnline fieldId={1} />
      <GameFieldOnline fieldId={2} />
      <GameFieldOnline fieldId={3} />
    </div>
    <div className='bg-league-grey-200 flex'>
      <CategoryFieldOnline categoryInfo={vertical[1]}/>
      <GameFieldOnline fieldId={4} />
      <GameFieldOnline fieldId={5} />
      <GameFieldOnline fieldId={6} />
    </div>
    <div className='bg-league-grey-200 flex'>
      <CategoryFieldOnline categoryInfo={vertical[2]}/>
      <GameFieldOnline fieldId={7} />
      <GameFieldOnline fieldId={8} />
      <GameFieldOnline fieldId={9} />
    </div>
  </div>

  )
}

export default BoardOnline;

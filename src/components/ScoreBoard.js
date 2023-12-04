import { useSelector } from 'react-redux'

  function ScoreBoard() {

  const {player1, player2} = useSelector(state => state.game)

  return (
    <div className='bg-league-gold-400  rounded-r-xl flex item'>
      <div className='p-2 bg-blue-600'></div>
      <div className='p-2'>
        {player1.alias}
      </div>
      <div className='p-2 bg-league-gold-300'>
        {player1.score} - {player2.score}
      </div>
      <div className='p-2'>
        {player2.alias}
      </div>
      <div className='p-2 bg-green-500 rounded-r-xl'></div>
    </div>
  )
}

export default ScoreBoard;

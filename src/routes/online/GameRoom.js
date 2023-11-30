import React, {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase-config';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux'

function GameRoom() {
  const dispatch = useDispatch()
  const {roomId} = useParams();
  const docRef = doc(db, "rooms", roomId)
  const player = localStorage.getItem("player")

  const {playersJoined, isLoadingGame} = useSelector(state => state.online)

  useEffect(() => {
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const currentData = snapshot.data()
      console.log("getting changes, current data ", currentData)
      // dispatch(setDBstate(currentData))
      // if (currentData.playersJoined.length == 2 && !currentData.isGameStarted) {
      // dispatch(startOnlineGame())
      // }
    })

    // dispatch(setRoomId(roomId))
    return () => unsubscribe
  },[])

  const handleIncrement = async () =>{
    // dispatch(startOnlineGame())
  }


  if (playersJoined.length < 2) {
    return (
      <>
        <div className="bg-slate-50 h-96"> Waiting for others to join</div>
        <button className="bg-slate-50 h-96" onClick={handleIncrement}>click increment</button>
      </>
    )
  }

  if (isLoadingGame) {
    return (
      <>
        <div className="bg-slate-50 h-96"> loading game</div>
        <Loading />
      </>
    )
  }
  else {
    return (
      <>
        {/* <GameInfoOnline />
        <BoardOnline /> */}
      </>
    )
  }
  
}

export default GameRoom;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, onSnapshot, } from 'firebase/firestore';
import { db } from '../firebase-config';
import Loading from '../components/Loading';

function GameRoom() {
    const {roomId} = useParams();
    const [playersJoined, setPlayersJoined] = useState([])
    const [documentData, setDocumentData] = useState({});
    const [player, setPlayer] = useState(localStorage.getItem("player"))

    const docRef = doc(db, "rooms", roomId)

    useEffect(() => {
      const getRoomData = async () => {
        const room = await getDoc(docRef)
        const {playersJoined} = (room.data())
        console.log(playersJoined)
        setPlayersJoined(playersJoined)
      }
      getRoomData()
    }, [])

    useEffect(() => {
      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        const {playersJoined} = snapshot.data()
        setPlayersJoined(playersJoined)
        setDocumentData(snapshot.data());
      })
      return () => unsubscribe
    },[])


    if (playersJoined.length < 2) {
      return (
        <div className="bg-slate-50 h-96">
          <h1>Game room: {roomId}</h1>
          <h1>Players joined {playersJoined.length}</h1>
          {playersJoined.map(player => <h3>{player}</h3>)}
        </div>
      )
    } else if (playersJoined.length >= 2) {
      return (
        <div className="bg-slate-50 min-h-full"> 
        <h1>
          game started
        </h1>
        <h1>Turn: {documentData.currentPlayer.name}</h1>
        <h1>{documentData.currentPlayer.name === player ? "Your turn" : "Waining for move"}</h1>
        </div>
      )
    } else {
      return(
        <Loading />
      )
    }
    

}

export default GameRoom;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import GameField from '../components/GameField';
import CategoryField from '../components/CategoryField';
import { useDispatch, useSelector } from 'react-redux'
import { setChampionNamesList, setGameFields, setHorizontalFields, setVerticalFields } from '../redux/slices/GameSlice';
import { useParams } from 'react-router-dom';

function GameRoom() {
    const {roomCode} = useParams();
    const [playersJoined, setPlayersJoined] = useState([])

    useEffect(() => {
        setPlayersJoined(players => [...players, localStorage.getItem("uid")])
    },[])

    return (
      <div className="App">
        <h1>Game room: {roomCode}</h1>
        <h1>Players joined uid</h1>
        {playersJoined.map(player => <h3>{player}</h3>)}
      </div>
    )
}

export default GameRoom;

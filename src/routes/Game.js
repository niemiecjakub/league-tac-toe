import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import GameInfo from "../components/GameInfo";
import Loading from "../components/Loading";
import EndGamePop from "../components/EndGamePop";
import { useDispatch, useSelector } from "react-redux";
import {  setDBstate } from "../redux/slices/GameSlice";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { overlayStyle } from "../constants";
import Popup from "reactjs-popup";
import StealInfo from "../components/StealInfo";
import WaitingRoom from "../components/WaitingRoom";
import { joinFromLink } from "../utility/roomFunctions";

function Game({gameMode}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [openEndGame, setOpenEndGame] = useState(false);

  const state = useSelector((state) => state.game);
  const { isLoadingGame, playersJoined, isGameOver } = state;

  useEffect(() => {
    if (!location.state && gameMode === "online") {
      joinFromLink(roomId);
    }
  }, []);

  useEffect(() => {
    const listenDB = async () => {
      if (gameMode === "online") {
        const docRef = doc(db, "rooms", roomId);
        onSnapshot(docRef, (snapshot) => {
          const currentData = snapshot.data();
          console.log(currentData)
          if (currentData !== state) {
            dispatch(setDBstate(currentData));
          }
        });
      }
    };
    listenDB();
    return () => listenDB();
  }, [dispatch]);

  useEffect(() => {
    isGameOver ? setOpenEndGame(true) : setOpenEndGame(false);
  }, [isGameOver]);

  if (gameMode === "online" && playersJoined.length < 2) {
    return (
      <div
        id="game-container"
        className="font-league max-h-fit w-screen md:m-auto md::w-1/2 2xl:w-1/5"
      >
        <WaitingRoom roomId={roomId} />
      </div>
    );
  }

  if (isLoadingGame) {
    return (
      <div
        id="game-container"
        className="font-league max-h-fit w-screen md:m-auto md:w-1/2 2xl:w-1/5"
      >
        <Loading text="Loading game" />
      </div>
    );
  }

  return (
    <>
      <div
        id="game-container"
        className="font-league max-h-fit w-screen md:m-auto md:w-1/2 2xl:w-1/5"
      >
        <GameInfo />
        <Board />
        <StealInfo />
        <Popup
          open={openEndGame}
          closeOnDocumentClick={false}
          onClose={() => setOpenEndGame(false)}
          {...{ overlayStyle }}
        >
          <EndGamePop setOpenEndGame={setOpenEndGame} />
        </Popup>
      </div>
    </>
  );
}

export default Game;

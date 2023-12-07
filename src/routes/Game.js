import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import GameInfo from "../components/GameInfo";
import Loading from "../components/Loading";
import EndGamePop from "../components/EndGamePop";
import { useDispatch, useSelector } from "react-redux";
import {
  setDBstate,
  setFieldOnline,
  clearState,
} from "../redux/slices/GameSlice";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, onSnapshot, deleteDoc } from "firebase/firestore";
import { overlayStyle } from "../constants";
import Popup from "reactjs-popup";
import StealInfo from "../components/StealInfo";
import WaitingRoom from "../components/WaitingRoom";
import { joinFromLink } from "../utility/roomFunctions";

function Game({ gameMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [openEndGame, setOpenEndGame] = useState(false);

  const state = useSelector((state) => state.game);
  const { isLoadingGame, playersJoined, isGameOver, opponentLeft } = state;

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log("User is leaving the page");
      dispatch(
        setFieldOnline({
          opponentLeft: true,
        })
      );
    };

    const listenDB = async () => {
      if (gameMode === "online") {
        const docRef = doc(db, "rooms", roomId);
        onSnapshot(docRef, (snapshot) => {
          const currentData = snapshot.data();
          if (currentData !== state) {
            dispatch(setDBstate(currentData));
          }
        });
      }
    };

    if (!location.state && gameMode === "online") {
      joinFromLink(roomId);
    }
    if (gameMode === "online" && opponentLeft) {
      navigate("/");
      dispatch(clearState());
      return () => {
        listenDB();
      };
    }
    isGameOver ? setOpenEndGame(true) : setOpenEndGame(false);
    window.addEventListener("beforeunload", handleBeforeUnload);
    listenDB();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      listenDB();
    };
  }, [opponentLeft, isGameOver, dispatch]);

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
        <div className="bg-green-300 w-full h-16 text-xl">{opponentLeft}</div>
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

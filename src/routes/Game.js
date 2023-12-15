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
  deleteRoom,
} from "../redux/slices/GameSlice";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import { overlayStyle } from "../constants";
import Popup from "reactjs-popup";
import StealInfo from "../components/StealInfo";
import WaitingRoom from "../components/WaitingRoom";
import { joinFromLink } from "../utility/roomFunctions";
import toast from "react-hot-toast";

function Game({ gameMode, random = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [openEndGame, setOpenEndGame] = useState(false);

  const state = useSelector((state) => state.game);
  const { isLoadingGame, playersJoined, isGameOver, opponentLeft } = state;

  useEffect(() => {
    const handleBeforeUnload = (event) => {
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

    const deleteDBRoom = async () => {
      if (gameMode === "online" && opponentLeft) {
        try {
          await dispatch(deleteRoom());
        } finally {
          dispatch(clearState());
        }
      }
    };

    if (!location.state && gameMode === "online") {
      joinFromLink(roomId);
    }
    if (gameMode === "online" && opponentLeft) {
      navigate("/");
      toast.custom(
        (t) => (
          <div
            className={`bg-red-400 py-4 px-5 rounded-xl text-xl text-white font-leagueheavy`}
          >
            Your opponent left the game
          </div>
        ),
        {
          duration: 1200,
        }
      );
      deleteDBRoom();

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
        className="font-league max-h-fit w-full md:m-auto"
      >
        <WaitingRoom roomId={roomId} />
      </div>
    );
  }

  if (isLoadingGame) {
    return (
      <div
        id="game-container"
        className="font-league max-h-fit w-full md:m-auto"
      >
        <Loading text="Loading game" />
      </div>
    );
  }

  return (
    <>
      <div
        id="game-container"
        className="font-league max-h-fit w-full md:m-auto"
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

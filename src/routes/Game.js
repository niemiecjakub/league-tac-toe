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
import { OVERLAY_STYLE } from "../utility/constants";
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

  const handleBeforeUnload = async (event) => {
    console.log("unload");
    await dispatch(
      setFieldOnline({
        opponentLeft: true,
      })
    );
  };

  const handlePopState = async (event) => {
    console.log("pop");
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
    try {
      await dispatch(deleteRoom());
    } finally {
      dispatch(clearState());
    }
  };

  useEffect(() => {
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
            Your opponent left the game or game abandoned
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

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);

    listenDB();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      listenDB();
    };
  }, [opponentLeft, isGameOver, dispatch, navigate]);

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
          {...{ OVERLAY_STYLE }}
        >
          <EndGamePop setOpenEndGame={setOpenEndGame} />
        </Popup>
      </div>
    </>
  );
}

export default Game;

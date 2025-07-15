// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";
// import ScoreBoard from "./score-board";
// import GameStatus from "./game-status";
// import DrawRequestPrompt from "./draw-request-pormpt";
// import Board from "./board";
// import Controls from "./controls";
// import { Game, Player, PlayerType } from "@/models/Game";
// import { move } from "@/services/gameService";

// interface GameBoardProps {
//     game: Game;
// }

// const TURN_TIME = 10;

// export default function GameBoard({ game }: GameBoardProps) {
//     const [board, setBoard] = useState<Player[][]>(game.boardState || Array(9).fill(null));
//     const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(game.currentTurnId);
//     const [winner, setWinner] = useState<PlayerType | "Draw" | null>(game.winnerId || null);

//     const [timeLeft, setTimeLeft] = useState<number>(TURN_TIME);
//     const [scoreX, setScoreX] = useState<number>(0);
//     const [scoreO, setScoreO] = useState<number>(0);
//     const [drawRequestedBy, setDrawRequestedBy] = useState<Player | null>(null);
//     const timerRef = useRef<NodeJS.Timeout | null>(null);

//     useEffect(() => {
//         if (game.boardState) {
//             setBoard(game.boardState);
//         }
//         if (game.currentTurnId) {
//             setCurrentPlayer(game.currentTurnId);
//         }
//         if (game.winnerId) {
//             setWinner(game.winnerId);
//         }

//         setTimeLeft(TURN_TIME);
//         if (timerRef.current) {
//             clearInterval(timerRef.current);
//         }
//         timerRef.current = setInterval(() => {
//             setTimeLeft((prev) => {
//                 if (prev === 1) {
//                     // Time's up, switch player
//                     handleTimeout();
//                     return TURN_TIME;
//                 }
//                 return prev - 1;
//             });
//         }, 1000);

//         return () => {
//             if (timerRef.current) {
//                 clearInterval(timerRef.current);
//             }
//         };
//     }, [currentPlayer, winner, game]);

//     function handleTimeout() {
//         // setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
//         // setTimeLeft(TURN_TIME);
//     }

//     async function handleClick(cellIndex: number) {
//         const response = await move(game.roomUID, cellIndex + 1); // Adjusting for 1-based index in API
//         if (response) {
//             setBoard(response.boardState);
//         }
//     }

//     function resetGame() {
//         // setBoard(Array(9).fill(null));
//         // setCurrentPlayer("X");
//         // setWinner(null);
//         // setTimeLeft(TURN_TIME);
//         // Do not reset scores on game reset, keep the state
//     }

//     function requestDraw() {
//         // const nextPlayer = currentPlayer === "X" ? "O" : "X";
//         // setDrawRequestedBy(currentPlayer);
//         // setCurrentPlayer(nextPlayer);
//         // setTimeLeft(TURN_TIME);
//     }

//     function skipTurn() {
//         // setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
//         // setTimeLeft(TURN_TIME);
//     }

//     function acceptDraw() {
//         // setWinner("Draw");
//         // setDrawRequestedBy(null);
//     }

//     function rejectDraw() {
//         // setDrawRequestedBy(null);
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen p-4">
//             <Card className="p-6 w-[320px]">
//                 <ScoreBoard scoreX={scoreX} scoreO={scoreO} />
//                 <Board board={board} onCellClick={handleClick} />
//                 <GameStatus winner={winner} currentPlayer={currentPlayer} timeLeft={timeLeft} />
//                 <Controls resetGame={resetGame} drawRequestedBy={drawRequestedBy} onRequestDraw={requestDraw} onSkipTurn={skipTurn} />
//                 <DrawRequestPrompt drawRequestedBy={drawRequestedBy} onAccept={acceptDraw} onReject={rejectDraw} />
//             </Card>
//         </div>
//     );
// }

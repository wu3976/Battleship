import { useEffect, useState } from "react";
import "./NormalGame.css";
import { GAME_AI_WIN, GAME_IN_PROGRESS, GAME_PLAYER_WIN } from "./constants/game_states";
import { BoardStateType } from "./types/BoardStateType";
import { getInitialBoardState } from "./algorithms/setup";
import { checkWin } from "./algorithms/game_actions";
import Timer from "./components/Timer";
import { BoardContext } from "./contexts/BoardContext";
import Board from "./components/Board";

export default function EasyGame() {
    let interval: null | number = null;
    
    const [time, setTime] = useState<number>(0);
    const [gameState, setGameState] = useState<number>(GAME_IN_PROGRESS);

    const [aiBoardState, setAiBoardState] = useState<BoardStateType>(getInitialBoardState());
    const aiBoardContextValue = {
        boardState: aiBoardState.currState,
        showShip: false,
        colSize: 10,
        handleClick: (i: number) => {
            console.log("Clicked AI board: " + i);
            if (gameState !== GAME_IN_PROGRESS) { 
                return; 
            }
            if (aiBoardState.currState[i] === 2 || aiBoardState.currState[i] === 3) {
                alert("Cannot target this cell");
                return; 
            }
            if (aiBoardState.currState[i] === 0) { 
                setAiBoardState(prev => {
                    prev.currState[i] = 2;
                    return prev;
                })
            }
            else if (aiBoardState.currState[i] === 1) { 
                setAiBoardState(prev => {
                    prev.currState[i] = 3;
                    return prev;
                })                
            }
            // check if player wins
            if (checkWin(aiBoardState.currState)) {
                setGameState(GAME_PLAYER_WIN);
                return;
            }
        }
    };

    const resetGame = () => {
        setTime(0);
        setGameState(GAME_IN_PROGRESS);
        setAiBoardState(getInitialBoardState());
    }

    useEffect(() => {
        if (!interval) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }   
    }, []);

    return <div className="normal-game-container">
            <div className="normal-game-first-row">
                <Timer seconds={time}/>
            <button onClick={resetGame} className="reset-button">Reset</button>
            </div>
            <div className="center game-state">
                {gameState === GAME_IN_PROGRESS && "Defeat the AI"}
                {gameState === GAME_AI_WIN && "You Lose!"}
                {gameState === GAME_PLAYER_WIN && "You Win!"}
            </div>
            <div className="board-title">ai board</div>
            <BoardContext.Provider value={aiBoardContextValue}>
                <Board />
            </BoardContext.Provider>
    </div>
}
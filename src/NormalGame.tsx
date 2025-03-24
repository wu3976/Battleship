import { useEffect, useState } from "react";
import { BoardContext } from "./contexts/BoardContext";
import Timer from "./components/Timer";
import "./NormalGame.css"
import Board from "./components/Board";
import { getInitialBoardState } from "./algorithms/setup";
import { aiStep, checkWin, generateAICannonFireSeq } from "./algorithms/game_actions";
import { BoardStateType } from "./types/BoardStateType";
import { GAME_IN_PROGRESS, GAME_AI_WIN, GAME_PLAYER_WIN } from "./constants/game_states";

export default function NormalGame() {
    const [aiCannonFireSeq, setAiCannonFireSeq]= useState<number[] | null>(null);
    let interval: null | number = null;

    const [time, setTime] = useState<number>(0);
    const [gameState, setGameState] = useState<number>(GAME_IN_PROGRESS);

    const [myBoardState, setMyBoardState] = useState<BoardStateType>(getInitialBoardState());
    const myBoardContextValue = {
        boardState: myBoardState.currState, 
        showShip: true, 
        colSize: 10, 
        handleClick: (i: number) => { 
            console.log("Clicked my board: " + i);
        } 
    };

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
            // ai take step
            aiStep(myBoardState.currState, aiCannonFireSeq);
            // check if ai wins
            if (checkWin(myBoardState.currState)) {
                setGameState(GAME_AI_WIN);
                return; 
            }
        }
    };

    

    const resetGame = () => {
        setTime(0);
        setGameState(GAME_IN_PROGRESS);
        setAiBoardState(getInitialBoardState());
        setMyBoardState(getInitialBoardState());
        setAiCannonFireSeq(generateAICannonFireSeq(myBoardState.currState))
    }

    useEffect(() => {
        if (!interval) {
            interval = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000);
        }
        if (aiCannonFireSeq === null) {
            setAiCannonFireSeq(generateAICannonFireSeq(myBoardState.currState));
        }
        console.log(aiCannonFireSeq);
        
    }, []);

    return <div className="normal-game-container">
        <div className="normal-game-first-row">
            <Timer seconds={time}/>
            <button className="reset-button" onClick={resetGame}>Reset</button>
        </div>
        
        <div className="center game-state">
            {gameState === GAME_IN_PROGRESS && "Defeat the AI"}
            {gameState === GAME_AI_WIN && "You Lose!"}
            {gameState === GAME_PLAYER_WIN && "You Win!"}
        </div>

        <div className="boards-container">
            <div>
                <div className="board-title">ai board</div>
                <BoardContext.Provider value={aiBoardContextValue}>
                    <Board />
                </BoardContext.Provider>
            </div>
            <div>
                <div className="board-title">my board</div>
                <BoardContext.Provider value={myBoardContextValue}>
                    <Board />
                </BoardContext.Provider>
            </div>
        </div>
    </div>
}
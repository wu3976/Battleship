// Fisher-Yates array shuffle algorithm
function shuffleArray(array: number[]): number[] {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
    }
    return arr;
}

export function generateAICannonFireSeq(boardStates: number[]): number[] {
    const aiCannonFireSeq = []
    for (let i = 0; i < boardStates.length; ++i) {        
        if (boardStates[i] === 0 || boardStates[i] === 1) { // do this for future extra credit            
            aiCannonFireSeq.push(i);
        }
    }
    
    return shuffleArray(aiCannonFireSeq);
}

export function aiStep(myCurrState: number[], aiCannonFireSeq: number[] | null): void  {
    if (aiCannonFireSeq === null) {
        throw Error("aiCannonFireSeq is null");
    }
    if (aiCannonFireSeq.length > 0) {
        const target: number = aiCannonFireSeq.pop() as number;
        if (myCurrState[target] === 2 || myCurrState[target] === 3) {
            throw Error("AI targeting a cell which has been bombed");
        }
        if (myCurrState[target] === 0) { myCurrState[target] = 2; }
        else if (myCurrState[target] === 1) { myCurrState[target] = 3; }
    } else {
        throw Error("aiCannonFireSeq emptied"); 
    }
}

export function checkWin(boardState: number[]): boolean {
    return !boardState.includes(1);
}

// export function updateShipDamage(boardState: BoardStateType, 
//         setBoardState: React.Dispatch<React.SetStateAction<BoardStateType>>, 
//         num: number) {
//     let idx = -1;
//     for (let i = 0; i < boardState.ships.length; ++i) {
//         if (boardState.ships[i].find(n => n === num)) {
//             idx = i;
//             return;
//         }
//     }
//     if (idx >= 0) {
//         let newship: number[] = [...boardState.ships[idx]].filter(val => val !== num);
//         setBoardState(prev => {
//             prev.ships
//         })
//     }
// }
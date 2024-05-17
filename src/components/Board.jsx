import { useState } from "react";
import "../index.css";

function Board() {
    const winnerArray = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const [inputs,setInputs] = useState(Array(9).fill(null));
    const [player,setPlayer] = useState(true);

    function calculateWinner() {
        for(let i = 0; i < winnerArray.length; i++) {
            const [x, y, z] = winnerArray[i];
            if(inputs[x] && inputs[x] === inputs[y] && inputs[x] === inputs[z]) {
                return inputs[x];
            }
        }
        return null;
    }

    const handleInput = (event) => {
        const index = parseInt(event.target.dataset.index);
        const copiedArray = inputs.map((input, idx) => {
            if (idx === index && !input) {
                return player ? "x" : "o";
            }
            return input;
        });

        setInputs(copiedArray);
        setPlayer(!player);
    };

    const winner = calculateWinner();
    let status = winner ? "Winner is " + (player ? "o" : "x") : "Next Player is " + (player ? "x" : "o");

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-300 to-blue-500 text-black">
            <h1 className="text-4xl font-bold mb-6">Tic Tac Game</h1>
            <section onClick={handleInput} className="grid grid-cols-3 gap-4 w-96 rounded-md shadow-lg p-4" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
                {inputs.map((input, index) => (
                    <div key={index} data-index={index} className="w-24 h-24 border border-solid border-gray-700 rounded-md flex justify-center items-center text-3xl font-bold cursor-pointer">
                        {input}
                    </div>
                ))}
            </section>
            <div className="mb-4 font-bold text-center p-2">{status}</div>
        </div>
    );
}

export default Board;

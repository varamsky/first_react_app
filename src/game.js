import React from 'react';
import Board from './board.js';

class Game extends React.Component {

    constructor() {
        super();

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // creating a copy of squares by slice method
        // this is to avoid mutating data

        // if already one player is winner then do nothing just return
        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        // this if-block ensures that an X or O is not overridden by pressing again on it
        if (squares[i] == null) {
            squares[i] = (this.state.xIsNext) ? 'X' : 'O';
            this.setState({
                history: history.concat([{ squares: squares, }]),
                stepNumber: history.length,
                xIsNext: !this.state.xIsNext, // alternate 'X' and 'O'
            });
        }

        /* this.state.squares[i] = 'X';
        this.setState({squares: this.state.squares}); */
    }


    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        // the list.map() accepts a function and the this value
        // like this, array.map(function(currentValue, index, arr), thisValue)
        //
        // as you can see the function has 3 arguments currentValue, index and arr
        //
        // therefore, for history.map((step, move) => {...});
        // step will have the current item from the history array and move will have the current index from the history array

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });


        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <React.StrictMode>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            handleClick={(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </React.StrictMode>
        );
    };
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        //console.log("squares[" + a + "] = " + squares[a] + "squares[" + b + "] = " + squares[b] + "squares[" + c +"] = " + squares[c]);
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}




export default Game;

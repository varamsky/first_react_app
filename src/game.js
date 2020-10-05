import React from 'react';
import Board from './board.js';
import ToggleButton from './components/toggleButton.js';

class Game extends React.Component {

    constructor() {
        super();

        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepInfo: [[]],
            stepNumber: 0,
            xIsNext: true,
            isToggled: false,
        };
    }

    calculateCurrentStepinfo(i) {
        let row, col;
        if (i < 3) {
            row = 0;
            if (i === 0) {
                col = 0;
            }
            else if (i === 1) {
                col = 1;
            }
            else {
                col = 2;
            }
        }
        else if (i < 6) {
            row = 1;
            if (i === 3) {
                col = 0;
            }
            else if (i === 4) {
                col = 1;
            }
            else {
                col = 2;
            }
        }
        else {
            row = 2;
            if (i === 6) {
                col = 0;
            }
            else if (i === 7) {
                col = 1;
            }
            else {
                col = 2;
            }
        }
        console.log("i = " + i + "row = " + row + "col = " + col);
        return [row, col];
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const stepInfo = this.state.stepInfo.slice();
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        // if already one player is winner then do nothing just return
        if (calculateWinner(squares)['squares'] || squares[i]) {
            return;
        }

        console.log("stepInfo Array = " + stepInfo);

        // creating a copy of squares by slice method
        // this is to avoid mutating data

        // this if-block ensures that an X or O is not overridden by pressing again on it
        if (squares[i] == null) {
            squares[i] = (this.state.xIsNext) ? 'X' : 'O';
            this.setState({
                history: history.concat([{ squares: squares, }]),
                stepNumber: history.length,
                //stepInfo: stepInfo.concat([[row,col]]),
                stepInfo: stepInfo.concat([this.calculateCurrentStepinfo(i)]),
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

    handleToggle() {
        this.setState({
            isToggled: !this.state.isToggled,
        });
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerResult = calculateWinner(current.squares);
        const winner = winnerResult['squares'];
        const winSquares = winnerResult['winSquares'];

        // the list.map() accepts a function and the this value
        // like this, array.map(function(currentValue, index, arr), thisValue)
        //
        // as you can see the function has 3 arguments currentValue, index and arr
        //
        // therefore, for history.map((step, move) => {...});
        // step will have the current item from the history array and move will have the current index from the history array

        const moves = history.map((step, move) => {

            move = (this.state.isToggled) ? history.length - move - 1 : move;

            const desc = move ?
                'Go to move #' + move + " [" + this.state.stepInfo[move][0] + " , " + this.state.stepInfo[move][1] + "]" :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                        style={move === this.state.stepNumber ? { fontWeight: 'bold' } : { fontWeight: 'normal' }} // bolding the current move else normal text
                    >{desc}</button>
                </li>
            );
        });


        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        }
        // to check if game's over and thus to declare draw
        else if (this.state.stepNumber === 9) {
            status = "It's a draw!!";
        }
        else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <React.StrictMode>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            handleClick={(i) => this.handleClick(i)}
                            winSquares={winSquares}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>

                        <ToggleButton rounded={true} isToggled={this.state.isToggled} onToggle={() => this.handleToggle()} />

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
            return { squares: squares[a], winSquares: [a, b, c] };
        }
    }
    return { squares: null, winSquares: null };
}




export default Game;

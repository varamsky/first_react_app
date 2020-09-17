import React from 'react';
import Square from './square.js';

class Game extends React.Component {

	constructor() {
		super();

		this.state = {
			// empty squares with null value
			squares: Array(9).fill(null),
			// by default the first chance will be 'X'
			xIsNext: true,
		};
	}

	handleClick(i) {
		// creating a copy of squares by slice method
		// this is to avoid mutating data
		const squares = this.state.squares.slice();

		// if already one player is winner then do nothing just return
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		// this if-block ensures that an X or O is not overridden by pressing again on it
		if (squares[i] == null) {
			squares[i] = (this.state.xIsNext) ? 'X' : 'O';
			this.setState({
				squares: squares,
				xIsNext: !this.state.xIsNext, // alternate 'X' and 'O'
			});
		}

		/* this.state.squares[i] = 'X';
		this.setState({squares: this.state.squares}); */
	}


	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div>
				<div className="status">{status}</div>
				<div className="row">
					<Square
						value={this.state.squares[0]}
						onclick={() => this.handleClick(0)}
					/>
					<Square
						value={this.state.squares[1]}
						onclick={() => this.handleClick(1)}
					/>
					<Square
						value={this.state.squares[2]}
						onclick={() => this.handleClick(2)}
					/>
				</div>
				<div className="row">
					<Square
						value={this.state.squares[3]}
						onclick={() => this.handleClick(3)}
					/>
					<Square
						value={this.state.squares[4]}
						onclick={() => this.handleClick(4)}
					/>
					<Square
						value={this.state.squares[5]}
						onclick={() => this.handleClick(5)}
					/>
				</div>
				<div className="row">
					<Square
						value={this.state.squares[6]}
						onclick={() => this.handleClick(6)}
					/>
					<Square
						value={this.state.squares[7]}
						onclick={() => this.handleClick(7)}
					/>
					<Square
						value={this.state.squares[8]}
						onclick={() => this.handleClick(8)}
					/>
				</div>
			</div>
		);
	}
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

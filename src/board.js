import React from 'react';
import Square from './square.js';

class Board extends React.Component {
	render() {

		let boardSquares = [];
		const winSquares = this.props.winSquares;
		for (let row = 0; row < 3; row++) {
			let boardRow = [];
			for (let col = 0; col < 3; col++) {
				boardRow.push(
					<span key={(row * 3) + col}>
						{
							<Square
								value={this.props.squares[(row * 3) + col]}
								onclick={() => this.props.handleClick((row * 3) + col)}
								className={winSquares != null && (winSquares.includes((row * 3) + col)) ? "square win" : "square"}
							/>
						}
					</span>
				);
			}
			boardSquares.push(<div className="row" key={row}>{boardRow}</div>);
		}

		return (
			<React.StrictMode>
				{
					// this uses loops to generate the squares instead of hardcoding them
					<div>
						{boardSquares}
					</div>

					// below is the squares hardcoded
					/* <div>
						<div className="row">
							<Square
								value={this.props.squares[0]}
								onclick={() => this.props.handleClick(0)}
							/>
							<Square
								value={this.props.squares[1]}
								onclick={() => this.props.handleClick(1)}
							/>
							<Square
								value={this.props.squares[2]}
								onclick={() => this.props.handleClick(2)}
							/>
						</div>
						<div className="row">
							<Square
								value={this.props.squares[3]}
								onclick={() => this.props.handleClick(3)}
							/>
							<Square
								value={this.props.squares[4]}
								onclick={() => this.props.handleClick(4)}
							/>
							<Square
								value={this.props.squares[5]}
								onclick={() => this.props.handleClick(5)}
							/>
						</div>
						<div className="row">
							<Square
								value={this.props.squares[6]}
								onclick={() => this.props.handleClick(6)}
							/>
							<Square
								value={this.props.squares[7]}
								onclick={() => this.props.handleClick(7)}
							/>
							<Square
								value={this.props.squares[8]}
								onclick={() => this.props.handleClick(8)}
							/>
						</div>
					</div> */
				}
			</React.StrictMode>
		);
	}
}


export default Board;

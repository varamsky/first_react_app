import React from 'react';
import Square from './square.js';

class Board extends React.Component {
	render() {
		return (
			<React.StrictMode>
				<div>
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
				</div>
			</React.StrictMode>
		);
	}
}


export default Board;

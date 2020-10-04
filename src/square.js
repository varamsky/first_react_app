import React from 'react';

function Square(props) {
	// using Square as a function because here it doesn't maintain any state
	// it only returns what is to be displayed on the screen in the return method
	return (
		<React.StrictMode>
			<button className={props.className} onClick={
				() => props.onclick() // by this calling the onClick method of Game class(parent class)
			}>
				{props.value}
			</button>
		</React.StrictMode>
	);
}

export default Square;

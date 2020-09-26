import React from 'react';
import './App.css';
import Game from './game.js';

class App extends React.Component {

  constructor() { // constructor(props){ // props is optional
    super();
    //super(props); // props here is optional if you don't have any properties to pass to the component

    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  tick() {
    this.setState(
      // The only place where you can assign this.state is the constructor
      // this.state.date = new Date() => this is WRONG!!
      {
        date: new Date()
      }
    );

    // use this to update the new State depending on the current state value
    // for example, counter: state.counter + props.increment
    /*this.setState(function (state) {
      return {
        date: state.date = new Date()
      };
    });*/


    // you can use this arrow function as well
    /*this.setState((state) => ({
      date: state.date = new Date()
    }));*/
  }


  render() {
    return (
      <React.StrictMode>
        <div>
          <h1>Hello world!!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          <p>This is my first React project</p>
          <div className="game">
            <Game />
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

export default App;

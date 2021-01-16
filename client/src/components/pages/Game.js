import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Game.css";

class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // THESE ALL SHOULD BE A PROP UNLESS MAYBE PLAYERS CAN BE AFTER THE GAME HAS STARTED
        // gameID: '123', 
        players: [],
        // numberOfRounds: null,
        // selectedDecks: ["a"],
      }
    }
    
    componentDidMount() {
      
    }
		
    render() { 
      return (
        <>
        <div className="Game-ResponseCard u-textCenter">Some response card</div>
        </>
      );
    }
  }
  
  export default Game;
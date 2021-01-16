import React, { Component } from "react";
import { Link } from "@reach/router";

class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        gameID: '123',
        players: [],
        numberOfRounds: null,
              selectedDecks: "a",
      }
    }
    
    componentDidMount() {
      
    }
  
    render() { 
      return (
        <>
          {this.props.gameID}
          <p>  This is a gam. am big boi</p>
        </>
      );
    }
  }
  
  export default Game;
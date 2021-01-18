import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Game.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import io from "socket.io-client";
const endpoint = window.location.hostname + ":" + window.location.port;

class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // THESE ALL SHOULD BE A PROP UNLESS MAYBE PLAYERS CAN BE AFTER THE GAME HAS STARTED
        gameID: window.location.pathname.substring(6), 
        players: [],
        // numberOfRounds: null,
        // selectedDecks: ["a"],
      }
    }
    
    testFunction = () => {
      post("/api/testingsocket", {gameID: this.state.gameID});
    }

    initGameSocket = () => {
      console.log("initializing game socket...");
      post("/api/initGameSocket", {gameID: this.state.gameID});
    }

    componentDidMount() {
      const socket = io(endpoint);
      socket.on("connect", () => {
        post("/api/initsocket", { socketid: socket.id }).then(() => {
          this.initGameSocket();
        })
      });      
      socket.on("gameUpdate", data => console.log(data));
    }
		
    render() {
      return (
        <>
        <div className="Game-ResponseCard u-textCenter" onClick={this.testFunction}>Some response card</div>
        </>
      );
    }
  }
  
  export default Game;
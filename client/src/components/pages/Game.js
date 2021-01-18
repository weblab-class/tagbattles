import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Game.css";
import Lobby from "../modules/Lobby.js";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import Player from "../modules/Player.js";
import Judge from "../modules/Judge.js";
import cards from "../../../../a_lot_of_cards.js";

class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // THESE ALL SHOULD BE A PROP UNLESS MAYBE PLAYERS CAN BE AFTER THE GAME HAS STARTED
        gameID: window.location.pathname.substring(6), 
        players: [{name: "Dude", _id:143}, {name: "Man", _id:123}, {name:"Sir", _id:123}],
        currentState: null,
        deckList: cards,
        // numberOfRounds: null,
        // selectedDecks: ["a"],
      }
    }
    
    testFunction = () => {
      post("/api/testingsocket", {gameID: this.state.gameID});
    }

    initGameSocket = () => {
    }

    startGame = (rounds, decks) => {
      post("/api/startGame", {
        'gameID' : this.state.gameID,
        'players' : players, // Here we only want to pass _id and name
        'rounds' : rounds,
        'decks' : decks
      })
    }

    componentDidMount() {
      console.log(socket);
      socket.off("gameUpdate").on("gameUpdate", data => {
        console.log(data);
        switch(data.type) {
          case "playerList":
            this.setState({
              players: data.players,
            });
            break;
          case "judgeUpdate":
            get('/whoami').then((me) => {
              if (me === data.judgeID) {
                this.setState({
                  currentState: 'judge',
                })
              } else {
                this.setState({
                  currentState: 'player',
                })
              }
            })
            break;
          case "numThinkingPlayers":
            this.setState({
              thinkingPlayers: data.numThinkingPlayers
            });
          case "displayCard":
            this.setState({
              displayCard: data.displayCard
            })
            break;
          default:
            break;
        }
      });
      post("/api/test", {socketid:socket.id}).then((data) => {
        console.log(data.socketid);
        post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(() => {
          console.log("here");
        });
      });
    }
		
    render() {
      return (
        <div>
          <Lobby players = {this.state.players} startGame = {this.startGame} testFunction = {this.testFunction}/>
          {this.state.currentState ? (this.state.currentState === "judge" ? <Judge gameID = {this.state.gameID}/>: <Player gameID = {this.state.gameID}/>) : null}
        </div>
      );
    }
  }
  
  export default Game;
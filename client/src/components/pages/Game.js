import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Game.css";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";

class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // THESE ALL SHOULD BE A PROP UNLESS MAYBE PLAYERS CAN BE AFTER THE GAME HAS STARTED
        gameID: window.location.pathname.substring(6), 
        players: [{name: "Dude", points: 0, type: "host"}, {name: "Man", points: 0, type: "player"}, {name:"Sir", points:0, type: "player"}],
        // numberOfRounds: null,
        // selectedDecks: ["a"],
      }
    }
    
    testFunction = () => {
      post("/api/testingsocket", {gameID: this.state.gameID});
    }

    initGameSocket = () => {
    }

    componentDidMount() {
      console.log(socket);
      socket.off("gameUpdate").on("gameUpdate", data => {
        console.log(data);
      });
      post("/api/test", {socketid:socket.id}).then((data) => {
        console.log(data.socketid);
        post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(() => {
          console.log("here");
        }); 
      });
      // socket.on("connect", () => {
      //   console.log(socket.connected);
      //   post("/api/initsocket", { socketid: socket.id }).then(() => {
      //     console.log("initializing game socket...");
      //     post("/api/initGameSocket", {gameID: this.state.gameID}).then(() => {
      //       socket.on("gameUpdate", data => {
      //         console.log(data);
      //       });
      //     });
      //   });
      // });
    }
		
    render() {
      return (
        <div className = "gamesettings-container">
          <h1>Lobby</h1>
          <div className = "game-container">
            <div className = "players-side">
              <h2 className = "container-label">Players</h2>
              <div className = "players-container">
                {this.state.players.map((player) => 
                  <div key={player.name} className = "player-container">
                    <div className = "player-image-container">
                      <img src = "" alt = "playerIcon" className = "player-image"/>
                    </div> 
                    <div className = "player-info-container">
                      <h3 className = "name-label">{player.name}</h3>
                      <p className = "points-label">{player.points} points</p>
                      <span className = "label-icon">{player.type}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className = "settings-side">
              <h2 className = "container-label">Settings</h2>
              <div className = "settings-container">
                <div className = "setting-container">
                  <h4 className = "settings-label">Rounds</h4>
                    <select>
                      <option value = "3">3</option>
                      <option value = "4">4</option>
                    </select>
                  <h4 className = "settings-label">Deck</h4>
                    <select>
                      <option value = "deck1">Deck 1</option>
                    </select>
                </div>
              </div>
              <div>
                <button></button>
              </div>
            </div>
          </div>
          <div className="Game-ResponseCard u-textCenter" onClick={this.testFunction}>Some response card</div>
        </div>
      );
    }
  }
  
  export default Game;
import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Game.css";
import Lobby from "../modules/Lobby.js";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities.js";
import Player from "../modules/Player.js";
import Judge from "../modules/Judge.js";

import GoogleLogin from "react-google-login";
const GOOGLE_CLIENT_ID = "640440795885-4do41cm5va1aumbs67c398b1m8m2574o.apps.googleusercontent.com";

// import cards from "../../../../a_lot_of_cards.js";

class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // THESE ALL SHOULD BE A PROP UNLESS MAYBE PLAYERS CAN BE AFTER THE GAME HAS STARTED
        userID: null,
        gameID: window.location.pathname.substring(6), 
        players: [],
        currentState: null,
        leaderboard: null,
        joinedGame: false,
        // deckList: cards,
        // numberOfRounds: null,
        // selectedDecks: ["a"],
      }
    }
    
    testFunction = () => {
      post("/api/testingsocket", {gameID: this.state.gameID});
    }

    startGame = (rounds, decks) => {
      post("/api/startGame", {
        'gameID' : this.state.gameID,
        'rounds' : rounds,
        'decks' : decks
      }).then((data) =>{
        console.log("started game");
      })
    }

    listenToServer = () => {
      socket.off("gameUpdate").on("gameUpdate", data => {
        console.log(data);
        switch(data.type) {
          case "playerList":
            this.setState({
              players: data.players,
            });
            break;
          case "judgeUpdate":
            console.log(data.judgeID);
            if (this.state.userID === data.judgeID) {
              this.setState({
                currentState: 'judge',
              })
            } else {
              this.setState({
                currentState: 'player',
              })
            }
            break;
          case "numThinkingPlayers":
            this.setState({
              numThinkingPlayers: data.numThinkingPlayers
            });
          case "displayCard":
            this.setState({
              displayCard: data.displayCard
            })
            break;
          case "gameEnded":
            console.log("Game has ended");
            console.log("leaderboard: ", data.leaderboard);
            this.setState({
              currentState: "gameEnd",
              leaderboard: data.leaderboard,
            })
          default:
            break;
        }
      });
    }

    componentDidMount() {
      get("/api/whoami").then(me => {
        this.setState({userID: me._id})
        if (this.state.userID) {
          post("/api/test", {socketid:socket.id}).then((data) => {
            post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(()=>{
              console.log('starting game')
              post("/api/addPlayer", {gameID: this.state.gameID, player : {_id : me._id, name: me.name}}).then((res) => {
                console.log('made game');
                this.setState({
                  joinedGame:true
                });
              });
            })
          });
        }
      });
      
      this.listenToServer();
      console.log(socket);
      if (this.state.userID) {
        post("/api/test", {socketid:socket.id}).then((data) => {
          post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(() =>{
            console.log('fakegame game')
            get("/api/whoami").then(me => {
              post("/api/addPlayer", {gameID: this.state.gameID, player : {_id : me._id, name: me.name}}).then((res) => {
                console.log('made game');
                this.setState({
                  joinedGame:true
                });
              });
            })
          });
        });
      }
      
    }
    
    handleLogin = (res) => {
      console.log(`Logged in as ${res.profileObj.name}`);
      const userToken = res.tokenObj.id_token;
      post("/api/login", { token: userToken }).then((user) => {
        this.setState({ userID: user._id });
        console.log(this.state.userID);
        post("/api/initsocket", { socketid: socket.id }).then(() => {
          console.log("hey in initsocket");
          post("/api/test", {socketid:socket.id}).then(() => {
            console.log("in test");
            post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(() => {
              console.log("in init"); this.listenToServer();
              console.log('starting game')
              post("/api/addPlayer", {gameID: this.state.gameID, player : {_id : me._id, name: me.name}}).then((res) => {
                console.log('made game');
                this.setState({
                  joinedGame:true
                });
              });  
            });
          });
        });
      });
    }

    render() {
      console.log("USER ID IS ", this.state.userID);
      if (!this.state.userID) {
        return (
        <div>
            Please Log in.
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
        </div>
        );
      }
      return (
        <div>
          {this.state.currentState ? (this.state.currentState === "judge" ? <Judge numThinkingPlayers = {this.state.numThinkingPlayers} gameID = {this.state.gameID} userID = {this.state.userID}/>: 
          (this.state.currentState === "gameEnd" ? <div><h2>Leaderboard</h2>{this.state.leaderboard.map((player) => (
          <div>{player.name}: {player.score}</div>
          ))}</div> : 
          <Player gameID = {this.state.gameID} displayCard = {this.state.displayCard} userID = {this.state.userID}/>)) : 
          <Lobby players = {this.state.players} startGame = {this.startGame} testFunction = {this.testFunction} joinedGame = {this.state.joinedGame}/>}
        </div>
      );
    }
  }
  
  export default Game;
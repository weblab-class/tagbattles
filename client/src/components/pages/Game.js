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
        'players' : this.state.players, // Here we want to pass _id and name. It looks like we cannot get this from the client side.
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
            if (this.state.playerID === data.judgeID) {
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
    }

    componentDidMount() {
      get("/api/whoami").then(me => {
        this.setState({userID: me._id})
        if (this.state.userID) {
          post("/api/test", {socketid:socket.id}).then((data) => {
            post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id});
          });
        }
      });
      this.listenToServer();
      console.log(socket);
      if (this.state.userID) {
        post("/api/test", {socketid:socket.id}).then((data) => {
          post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id});
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
          post("/api/test", {socketid:socket.id}).then((data) => {
            console.log("in test");
            post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(() => {console.log("in init"); this.listenToServer();});
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
          {this.state.currentState ? (this.state.currentState === "judge" ? <Judge gameID = {this.state.gameID}/>: 
          <Player gameID = {this.state.gameID}/>) : 
          <Lobby players = {this.state.players} startGame = {this.startGame} testFunction = {this.testFunction}/>}
        </div>
      );
    }
  }
  
  export default Game;
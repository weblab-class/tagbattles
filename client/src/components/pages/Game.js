import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Game.css";
import Lobby from "../modules/Lobby.js";
import { socket } from "../../client-socket.js";
import Leaderboard from "../modules/Leaderboard.js";
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
        userName: null,
        gameID: window.location.pathname.substring(6), 
        players: [],
        host: "",
        currentState: null,
        leaderboard: null,
        joinedGame: false,
        displayPlayerError: false,
        rounds: 3,
        deck: "Apples2Apples",
        // deckList: cards,
        // numberOfRounds: null,
        // selectedDecks: ["a"],
      }
    }
    
    testFunction = () => {
      post("/api/testingsocket", {gameID: this.state.gameID});
    }

    startGame = (rounds, decks) => {
      if(this.state.players.length > 1){
        post("/api/startGame", {
          'gameID' : this.state.gameID,
          'rounds' : this.state.rounds,
          'decks' : [this.state.deck],
        }).then((data) =>{
          console.log("started game");
        })
      }
      else{
        this.setState({
          displayPlayerError: true,
        })
      }
    }

    listenToServer = () => {
      socket.off("gameUpdate").on("gameUpdate", data => {
        console.log(data);
        switch(data.type) {
          case "playerList":
            this.setState({
              players: data.players,
              displayPlayerError: false,
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
            break;
          case "updateHost":
            console.log("Host Updated");
            console.log(data.host);
            this.setState({
              host: data.host,
            })
            break;
          case "roundsUpdate":
            console.log("Rounds Updated");
            console.log(data.rounds);
            this.setState({
              rounds: data.rounds,
            });
            break;
          case "deckUpdate":
            console.log("Deck Updated");
            console.log(data.deck);
            this.setState({
              deck: data.deck,
            })
            break;
          default:
            console.log("Missing event");
            break;
        }
      });
    }

    async componentDidMount() {
      console.log(socket);
      await get("/api/whoami").then(me => {
        if (!me) return console.log("WTF YOU SHOULD HAVE LOGGED IN");
        this.setState({userID: me._id, userName: me.name});
        if (me._id) {
          post("/api/test", {socketid:socket.id}).then((data) => {
            post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(()=>{
              console.log('starting game')
              post("/api/addPlayer", {gameID: this.state.gameID, player : {_id : me._id, name: me.name}}).then((res) => {
                console.log('made game');
                this.setState({
                  joinedGame:true
                });
                get("/api/getRounds", {gameID: this.state.gameID}).then((roundsData) => {
                  console.log("ROUNDSAFDSF: ",roundsData.rounds);
                  this.setState({
                    rounds: roundsData.rounds,
                  })
                  get("/api/getDeck", {gameID: this.state.gameID}).then((deckData) => {
                    console.log("DECKASDF:",deckData.deck);
                    this.setState({
                      deck: deckData.deck,
                    })
                  })
                })
              });
            })
          });
        }
      });
      
      this.listenToServer();      
    }
    
    handleLogin = (res) => {
      console.log(`Logged in as ${res.profileObj.name}`);
      const userToken = res.tokenObj.id_token;
      post("/api/login", { token: userToken }).then(async (user) => {
        this.setState({ userID: user._id, userName: user.name});
        console.log(this.state.userID);
        post("/api/initsocket", { socketid: socket.id }).then(() => {
          console.log("hey in initsocket");
          post("/api/test", {socketid:socket.id}).then(() => {
            console.log("in test");
            post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(() => {
              console.log("in init"); this.listenToServer();
              console.log('starting game')
              post("/api/addPlayer", {gameID: this.state.gameID, player : {_id : this.state.userID, name: this.state.userName}}).then((res) => {
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
        <div className = "Game-game-container">
          {this.state.currentState ? (this.state.currentState === "judge" ? <Judge numThinkingPlayers = {this.state.numThinkingPlayers} gameID = {this.state.gameID} userID = {this.state.userID}/>: 
          (this.state.currentState === "gameEnd" ? 
            <Leaderboard leaderboard = {this.state.leaderboard}/>
          : 
          <Player gameID = {this.state.gameID} displayCard = {this.state.displayCard} userID = {this.state.userID}/>)) : 
          <Lobby 
            players = {this.state.players} 
            startGame = {this.startGame} 
            testFunction = {this.testFunction} 
            joinedGame = {this.state.joinedGame}
            displayPlayerError = {this.state.displayPlayerError}
            host = {this.state.host}
            userID = {this.state.userID}
            gameID = {this.state.gameID}
            rounds = {this.state.rounds}
            deck = {this.state.deck}
          />}
        </div>
      );
    }
  }
  
  export default Game;
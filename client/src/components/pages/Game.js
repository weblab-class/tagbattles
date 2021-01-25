import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Game.css";
import Lobby from "../modules/Lobby.js";
import { socket } from "../../client-socket.js";
import Leaderboard from "../modules/Leaderboard.js";
import { get, post } from "../../utilities.js";
import Player from "../modules/Player.js";
import Judge from "../modules/Judge.js";
import PlayerChatMenu from '../modules/playerChatMenu.js';
import PlayerList from '../modules/PlayerList.js';
import GameChat from '../modules/GameChat.js';

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
        gameID: this.props.gameID, 
        players: [],
        host: "",
        currentState: null,
        currentPlayerState: 0,
        judgeID: "",
        leaderboard: null,
        chats: [],
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
          //console.log("started game");
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
        //console.log(data);
        switch(data.type) {
          case "playerList":
            this.setState({
              players: data.players,
              displayPlayerError: false,
            });
            break;
          case "judgeUpdate":
            //console.log(data.judgeID);
            if (this.props.userID === data.judgeID) {
              this.setState({
                currentState: 'judge',
                judgeID: data.judgeID,
              })
            } else {
              this.setState({
                currentState: 'player',
                judgeID: data.judgeID,
              })
            }
            break;
          case "numThinkingPlayers":
            console.log("I think there are ", data.numThinkingPlayers)
            this.setState({
              numThinkingPlayers: data.numThinkingPlayers
            });
            break;
          case "displayCard":
            this.setState({
              displayCard: data.displayCard
            })
            break;
          case "gameEnded":
            //console.log("Game has ended");
            //console.log("leaderboard: ", data.leaderboard);
            this.setState({
              currentState: "gameEnd",
              leaderboard: data.leaderboard,
            })
            break;
          case "updateHost":
            //console.log("Host Updated");
            //console.log(data.host);
            this.setState({
              host: data.host,
            })
            break;
          case "roundsUpdate":
            //console.log("Rounds Updated");
            //console.log(data.rounds);
            this.setState({
              rounds: data.rounds,
            });
            break;
          case "reset":
            console.log("reset state")
            this.setState({
              currentPlayerState: 0,
            })
            break;
          case "tentativeWinner":
            this.setState({
              tentativeWinner: data.card,
            });
            break;
          case "deckUpdate":
            //console.log("Deck Updated");
            //console.log(data.deck);
            this.setState({
              deck: data.deck,
            })
            break;
          case "chatUpdate":
            this.setState((prevState) => {
              return {
                chats: prevState.chats.concat(data.chat),
              }
            })
            break;
          case "leaderboard":
            this.setState({
              leaderboard: data.leaderboard,
            })
          default:
            console.log("Missing event: ",  data.type);
            break;
        }
      });
    }

    async componentDidMount() {
      this.handleMount();
    }
    
    handleMount = async () => {
      console.log(socket);
      
      if (this.props.userID) {
        console.log("Nameasdhdsahd:", this.props.userName);
        post("/api/test", {socketid:socket.id}).then((data) => {
          post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(()=>{
            //console.log('starting game')
            post("/api/addPlayer", {gameID: this.state.gameID, player : {_id : this.props.userID, name: this.props.userName}}).then((res) => {
              //console.log('made game');
              this.setState({
                joinedGame:true
              });
              get("/api/getRounds", {gameID: this.state.gameID}).then((roundsData) => {
                this.setState({
                  rounds: roundsData.rounds,
                })
                get("/api/getDeck", {gameID: this.state.gameID}).then((deckData) => {
                  this.setState({
                    deck: deckData.deck,
                  })
                  console.log("Mounting Chat");
                  get("/api/getChatMessages", {gameID: this.state.gameID}).then((chatData) => {
                    console.log(data.chat);
                    this.setState({
                      chats: chatData.chat,
                    })
                  })
                })
              })
            });
          })
        });
      }
      
      this.listenToServer();   
    }
    
    handleLogin = (res) => {
      //console.log(`Logged in as ${res.profileObj.name}`);
      const userToken = res.tokenObj.id_token;
      post("/api/login", { token: userToken }).then(async (user) => {
        this.setState({ userID: user._id, userName: user.name});
        //console.log(this.state.userID);
        post("/api/initsocket", { socketid: socket.id }).then(() => {
          //console.log("hey in initsocket");
          post("/api/test", {socketid:socket.id}).then(() => {
            //console.log("in test");
            post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(() => {
              //console.log("in init"); this.listenToServer();
              //console.log('starting game')
              post("/api/addPlayer", {gameID: this.state.gameID, player : {_id : this.props.userID, name: this.props.userName}}).then((res) => {
                //console.log('made game');
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
      console.log("USER ID IS ", this.props.userID);
      console.log("User Name is: ", this.props.userName);
      if (!this.props.userID) {
        return (
        <div>
            Please Log in.
        </div>
        );
      }
      return (
        <div className = "Game-game-container">
          {/*this.props.userID?<PlayerChatMenu userID = {this.props.userID} location = "left"/>:null*/}
          <div className = "Game-main-container">
            {this.state.currentState ? 
              (this.state.currentState === "judge" ? 
                <Judge 
                  numThinkingPlayers = {this.state.numThinkingPlayers} 
                  gameID = {this.state.gameID} 
                  userID = {this.props.userID}
                />
              : 
                (this.state.currentState === "gameEnd" ? 
                  <Leaderboard leaderboard = {this.state.leaderboard}/>
                : 
                  <Player 
                    gameID = {this.state.gameID} 
                    currentState = {this.state.currentPlayerState}
                    setCurrentState = {(newState) => {this.setState({currentPlayerState : newState})}}
                    displayCard = {this.state.displayCard} 
                    tentativeWinner={this.state.tentativeWinner}
                    userID = {this.props.userID}/>
                )
              ) 
            : 
              <Lobby 
                players = {this.state.players} 
                startGame = {this.startGame} 
                testFunction = {this.testFunction} 
                joinedGame = {this.state.joinedGame}
                displayPlayerError = {this.state.displayPlayerError}
                host = {this.state.host}
                userID = {this.props.userID}
                gameID = {this.state.gameID}
                rounds = {this.state.rounds}
                deck = {this.state.deck}
                userName = {this.props.userName}
              />
            }
          </div>
          <div className = "Game-rightBar">
            <PlayerList 
              players = {this.state.players} 
              host = {this.state.host}
              stage = {this.state.currentState}
              judgeID = {this.state.judgeID}
              leaderboard = {this.state.leaderboard}
              playerID = {this.props.userID}
            />
            <GameChat
              userID = {this.props.userID}
              gameID = {this.state.gameID}
              userName = {this.props.userName}
              chats = {this.state.chats}
            />
          </div>
        </div>
      );
    }
  }
  
  export default Game;
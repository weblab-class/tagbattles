import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Game.css";
import Lobby from "../modules/Lobby.js";
import { socket } from "../../client-socket.js";
import Leaderboard from "../modules/Leaderboard.js";
import { get, post } from "../../utilities.js";
import Player from "../modules/Player.js";
import Judge from "../modules/Judge.js";
import PlayerChatButton from '../modules/PlayerChatButton.js';
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
        userID: this.props.userID,
        userName: null,
        gameID: window.location.pathname.substring(6), 
        players: [],
        host: "",
        currentState: "lobby",
        currentPlayerState: "selecting",
        judgeID: "",
        leaderboard: null,
        chats: [],
        joinedGame: false,
        displayPlayerError: false,
        displayDeckError: false,
        rounds: 3,
        decks: [],
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
        if(decks.length > 0){
          post("/api/startGame", {
            'gameID' : this.state.gameID,
            'rounds' : this.state.rounds,
            'decks' : decks,
          }).then((data) =>{
            ////console.log("started game");
          })
        }
        else{
          this.setState({
            displayDeckError: true,
            displayPlayerError: false,
          })
        }
      }
      else{
        this.setState({
          displayPlayerError: true,
          displayDeckError: false,
        })
      }
    }

    listenToServer = () => {
      socket.off("gameUpdate").on("gameUpdate", data => {
        ////console.log(data);
        switch(data.type) {
          case "playerList":
            console.log("RECEIVED PLAYERS: ", data.players);
            this.setState({
              players: data.players,
              displayPlayerError: false,
            });
            break;
          case "judgeUpdate":
            console.log("got a judge socket", data.judgeID);
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
            ////console.log("Game has ended");
            ////console.log("leaderboard: ", data.leaderboard);
            this.setState({
              currentState: "leaderboard",
              leaderboard: data.leaderboard,
            })
            break;
          case "updateHost":
            ////console.log("Host Updated");
            ////console.log(data.host);
            this.setState({
              host: data.host,
            })
            break;
          case "roundsUpdate":
            ////console.log("Rounds Updated");
            ////console.log(data.rounds);
            this.setState({
              rounds: data.rounds,
            });
            break;
          case "reset":
            //console.log("reset state")
            this.setState({
              currentPlayerState: "selecting",
            })
            break;
          case "tentativeWinner":
            this.setState({
              tentativeWinner: data.card,
            });
            break;
          case "deckUpdate":
            ////console.log("Deck Updated");
            ////console.log(data.deck);
            console.log("UPDATED DECKS: ", data.decks.map((deck) => deck.value));
            this.setState({
              decks: data.decks.map((deck) => deck.value),
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
            //console.log("Missing event: ",  data.type);
            break;
        }
      });
    }

    async componentDidMount() {
      console.log("I AM IN DIDMOUNT");
      //console.log("GAME ID IS ", this.state.gameID);
      await this.handleMount();
    }
    
    handleMount = async () => {
      if (socket.disconnected) {
        console.log("socket id is", socket.id);
        await socket.io.reconnect();
      }
      if (this.props.userID) {
        //console.log("Game.js Nameasdhdsahd:", this.props.userName);
        post("/api/test", {socketid:socket.id}).then((data) => {
          post("/api/initGameSocket", {gameID: this.state.gameID, socketid:socket.id}).then(()=>{
            ////console.log('starting game')
            post("/api/addPlayer", {gameID: this.state.gameID, player : {_id : this.props.userID, name: this.props.userName}}).then((res) => {
              //console.log('made game');
              console.log(res)
              if(res.status === 'Game Full'){
                this.setState({
                  currentState: "fullGame",
                  joinedGame: false,
                })
              }
              else{
                this.setState({
                  joinedGame:true
                });
                get("/api/getGameStatus", {gameID: this.state.gameID}).then((gameData) => {
                  console.log("GAME STATUS: ",gameData.status);
                  this.setState({
                    currentState: gameData.status,
                  })
                  get("/api/getRounds", {gameID: this.state.gameID}).then((roundsData) => {
                    this.setState({
                      rounds: roundsData.rounds,
                    })
                    get("/api/getDecks", {gameID: this.state.gameID}).then((deckData) => {
                      this.setState({
                        decks: deckData.decks.map(deck => deck.value),
                      })
                      console.log("Mounting Chat");
                      get("/api/getChatMessages", {gameID: this.state.gameID}).then((chatData) => {
                        console.log(data.chat);
                        this.setState({
                          chats: chatData.chat,
                        })
                        if(gameData.status === 'inSession'){
                          get("/api/getPlayerStatus", {gameID: this.state.gameID, playerID: this.props.userID}).then((playerData) => {
                            this.setState({
                              currentPlayerState: playerData.status,
                            })
                          })
                        }
                      })
                    })
                  })
                })
                if (res.status === 'Started') {
                  get('/api/displayCardRevealed', {gameID : this.state.gameID}).then((qqres) => {
                    console.log("qqres", qqres.isRevealed);
                    if (qqres.isRevealed) {
                      get('/api/currentPromptCard', {gameID : this.state.gameID}).then((qres) => {
                        console.log(qres, "qres");
                        this.setState({
                          displayCard : qres.displayCard,
                        })
                      }).catch(
                        (e) => console.log(e)
                      )
                    }
                  }).catch(
                    (e) => console.log(e)
                  )
                  this.setState({
                    currentState : 'player',
                  })
                }
              }
            });
          })
        });
      }
      
      this.listenToServer();   
    }
    
    componentWillUnmount() {
      // window.location.reload(true);
      console.error("COMPONENT IS BEING UNMOUNTED");
      post("/api/disconnectUser", {gameID: this.state.gameID, userID: this.state.userID, socketID: this.state.socketID});
    }
    render() {
      //console.log("USER ID IS ", this.props.userID);
      //console.log("User Name is: ", this.props.userName);
      if (!this.props.userID) {
        return (
        <div>
            Please Log in.
        </div>
        );
      }
      return (
        <div className = "Game-game-container">
          {/*this.props.userID?<PlayerChatButton userID = {this.props.userID} location = "left"/>:null*/}
          {this.state.currentState === 'fullGame' ? 
            <h1 className = "Game-game-full">Game is Full</h1>
          :
            <>
              <div className = "Game-main-container">
                {this.state.currentState === 'lobby' ? 
                  <Lobby 
                    players = {this.state.players} 
                    startGame = {this.startGame} 
                    testFunction = {this.testFunction} 
                    joinedGame = {this.state.joinedGame}
                    displayPlayerError = {this.state.displayPlayerError}
                    displayDeckError = {this.state.displayDeckError}
                    host = {this.state.host}
                    userID = {this.props.userID}
                    gameID = {this.state.gameID}
                    rounds = {this.state.rounds}
                    decks = {this.state.decks}
                    userName = {this.props.userName}
                  />
                : 
                  (this.state.currentState === 'leaderboard' ? 
                    <Leaderboard leaderboard = {this.state.leaderboard}/>
                  :
                    (this.state.currentState === "player" ? 
                      <Player 
                        gameID = {this.state.gameID} 
                        currentState = {this.state.currentPlayerState}
                        setCurrentState = {(newState) => {this.setState({currentPlayerState : newState})}}
                        displayCard = {this.state.displayCard} 
                        tentativeWinner={this.state.tentativeWinner}
                        userID = {this.props.userID}
                      />
                    : 
                      <Judge 
                        numThinkingPlayers = {this.state.numThinkingPlayers} 
                        gameID = {this.state.gameID} 
                        userID = {this.props.userID}
                      />
                    )
                  )
                }
              </div>
              <div className = "Game-rightBar">
                <PlayerList 
                  players = {this.state.players} 
                  host = {this.state.host}
                  stage = {this.state.currentState}
                  judgeID = {this.state.judgeID}
                  playerID = {this.props.userID}
                />
                <GameChat
                  userID = {this.props.userID}
                  gameID = {this.state.gameID}
                  userName = {this.props.userName}
                  chats = {this.state.chats}
                />
              </div>
            </>
          }
        </div>
      );
    }
  }
  
  export default Game;
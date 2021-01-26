import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Navbar from "./modules/Navbar.js";
import GameSettings from "./pages/GameSettings.js";
import JoinGame from "./pages/JoinGame.js";
import Game from "./pages/Game.js";
import Profile from "./pages/Profile.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import DeckCreator from "./pages/DeckCreator.js";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      gameID: null,
      userName: "",
    };
  }

  async componentDidMount() {
    await get("/api/newGameID").then(data => {
      (this.setState({gameID: data.gameID}));
      //console.log("Game ID: ",this.state.gameID);
      get("/api/whoami").then((user) => {
        if (user._id) {
          // they are registed in the database, and currently logged in.
          this.setState({ userId: user._id, userName: user.name });
          console.log("Now my userid is ", user._id); 
        }
      }).catch(e => console.log(e));
     }).catch(error => console.error(error));
    
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    console.log("logged in")
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id, userName: user.name});
      post("/api/initsocket", { socketid: socket.id }).catch((e)=>console.log(e));
    }).catch((e)=>console.log(e));
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout").catch((e)=>console.log(e));
  };

  setNewGameID = () => {
    get("/api/newGameID").then(data => {
      (this.setState({gameID: data.gameID}));
      console.log("Game ID: ",this.state.gameID);
     }).catch(error => console.error(error));
  }

  saveUserName = (newName) => {
    this.setState({
      userName: newName,
    })
  }

  render() {
    return (
      <>
        <Navbar
          userId = {this.state.userId}
          handleLogin = {this.handleLogin}
          handleLogout = {this.handleLogout}
          gameID = {this.state.gameID}
          setNewGameID = {this.setNewGameID}
        />
        <Router>
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userID={this.state.userId}
          />
          {/* <GameSettings path="/play" /> */}
          <Game key={this.state.userId + "a"} userID={this.state.userId} userName={this.state.userName} path="/play/:gameID" gameID = {this.state.gameID}/>
          <JoinGame path = "/play/"/>
          <DeckCreator key={this.state.userId + "a"} userID={this.state.userId} userName={this.state.userName} path="/create"/>
          <Profile path = "/profile/:playerID" userName = {this.state.userName} saveName = {this.saveUserName}/>
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;

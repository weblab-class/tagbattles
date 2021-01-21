import React, { Component } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import Navbar from "./modules/Navbar.js";
import GameSettings from "./pages/GameSettings.js";
import JoinGame from "./pages/JoinGame.js";
import Game from "./pages/Game.js";

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
    };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    }).catch(e => console.log(e));
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id }).catch((e)=>console.log(e));
    }).catch((e)=>console.log(e));
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout").catch((e)=>console.log(e));
  };

  render() {
    return (
      <>
        <Navbar
          userId = {this.state.userId}
          handleLogin = {this.handleLogin}
          handleLogout = {this.handleLogout}
        />
        <Router>
          <Skeleton
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userId={this.state.userId}
          />
          {/* <GameSettings path="/play" /> */}
          <Game path="/play/:gameID" />
          <JoinGame path = "/join/"/>
          <DeckCreator path="/create" />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;

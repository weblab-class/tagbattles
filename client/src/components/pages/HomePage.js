import React, { Component } from "react";
import { Link } from "@reach/router";
import "./HomePage.css";
import { get, post } from "../../utilities";


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: null,
    }
  }
  
  componentDidMount() {
    get("/api/newGameID").then(data => (this.setState({gameID: data.gameID}))).catch(error => console.error(error));
  }

  requireLogin = () => {
    alert("Please log in first");
  }
  render() { 
    return (
      <>
      {this.props.userID ? (
        <>
          <Link to={"/play/" + this.state.gameID}>
            <button>Start Game</button>
          </Link>
          <Link to={"/join/"}>
            <button>Join Game</button>
          </Link>
        </>
      ) : (
        <>
        <button onClick={this.requireLogin}>Start Game</button>
        <button onClick={this.requireLogin}>Join Game</button>
        </>
      )}
      </>
    );
  }
}

export default HomePage;
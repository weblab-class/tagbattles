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

  render() { 
    return (
      <>
      {this.state.gameID ? (
        <Link to={"/play/" + this.state.gameID}>
          <button >Start Game</button>
        </Link>
      ) : (
        <p>Please log in and refresh!</p>
      )}
        <button>Join Game</button>
      </>
    );
  }
}

export default HomePage;
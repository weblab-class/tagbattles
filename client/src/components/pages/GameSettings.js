import React, { Component } from "react";
import { Link } from "@reach/router";
import "./GameSettings.css";


class GameSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: null,
      players: [],
      numberOfRounds: null,
			selectedDecks: "a",
    }
  }
  
  componentDidMount() {
    // Creates a game ID
    this.setState({gameID:'123'});
  }

  render() { 
    return (
      <>
        <input type="number" />
				{this.state.gameID ? (
          <Link to={"/play/" + this.state.gameID}>
            <button>Start Game</button>
          </Link>
        ) : (
					<p>Loading Link</p>
				)}
        <select>
            <option value="a">a</option>
        </select>
        <p>{this.state.selectedDecks}</p>
      </>
    );
  }
}

export default GameSettings;
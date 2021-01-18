import React, { Component } from "react";
import { Link } from "@reach/router";
import "./GameSettings.css";
import { get, post } from "../../utilities";

class GameSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameID: null,
      players: [],
      numberOfRounds: null,
			selectedDecks: ["a", "b"],
    }
  }
  
  setupGame() {
    
  }

  componentDidMount() {
    // Creates a game ID
    // socket.disconnect();

    get("/api/newGameID").then(data => (this.setState({gameID: data.gameID}))).catch(error => console.error(error));
  }

  render() { 
    return (
      <>
        <input type="number" />
				{this.state.gameID ? (
          <Link to={"/play/" + this.state.gameID}>
            <button >Start Game</button>
          </Link>
        ) : (
					<p>Creating the room!</p>
				)}
        <select>
            <option value="a">a</option>
        </select>
        {this.state.selectedDecks.map((cardPack) => (<p key={cardPack}>{cardPack}</p>))}
      </>
    );
  }
}

export default GameSettings;
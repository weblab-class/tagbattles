import React, { Component } from "react";
import { Link } from "@reach/router";
import "./PromptCardSelector.css";
import { get } from "../../utilities";

class PromptCardSelector extends Component{
  constructor(props){
    super(props)
    this.state = {
        card: null
    }
  }
  componentDidMount() {
    // Creates a game ID
    get("/api/getNewPromptCard", {gameID : this.state.gameID}).then(data => (this.setState({card: data.card}))).catch(error => console.error(error));
  }
  skipCard = () => {
		get("/api/getNewPromptCard", {gameID : this.state.gameID}).then(data => (this.setState({card: data.card}))).catch(error => console.error(error));
  }

  selectCard = () => {
    post("/api/newGameID/selectCard", {card: this.state.card});
  }

  render () {
    return (
      <div>
        <p>{this.state.card ? this.state.card : "Loading plz wait"}</p>
        <div>
          <button>Skip Card</button>
          <button>Select Card</button>
        </div>
      </div>
    )
  }
}

export default PromptCardSelector
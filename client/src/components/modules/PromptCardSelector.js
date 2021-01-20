import React, { Component } from "react";
import { Link } from "@reach/router";
import "./PromptCardSelector.css";
import "./DisplayCard.js";
import { get, post } from "../../utilities";
import DisplayCard from "./DisplayCard.js";

/**
 * Description of PromptCardSelector
 *
 * Proptypes
 * @param {string} gameID to display
 */
class PromptCardSelector extends Component{
  constructor(props){
    super(props)
    this.state = {
        card: null,
        selectedCard: false,
    }
  }
  componentDidMount() {
    get("/api/getNewPromptCard", {gameID : this.props.gameID}).then(data => (this.setState({card: data.card}))).catch(e => {
      console.log(e);
    });
  }

  skipCard = () => {
		get("/api/getNewPromptCard", {gameID : this.props.gameID}).then(data => (this.setState({card: data.card}))).catch(e => {
      console.error(e)
    });
  }

  selectCard = () => {
    post("/api/selectPromptCard", {gameID : this.props.gameID, card: this.state.card}).then(response => {
      this.setState({
        selectedCard : true,
      })
    }).catch(e => {
      console.log(e);
    });
  }

  render () {
    return (
      <div className = "PromptCardSelector-container">
        {this.state.card ? <DisplayCard text = {this.state.card}/> : <p>Loading</p>}
        <div>
          <button hidden={this.state.selectedCard} onClick = {this.skipCard}>Skip Card</button>
          <button hidden={this.state.selectedCard} onClick = {this.selectCard}>Select Card</button>
        </div>
      </div>
    )
  }
}

export default PromptCardSelector
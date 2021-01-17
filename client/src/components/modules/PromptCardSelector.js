import React, { Component } from "react";
import { Link } from "@reach/router";
import "./PromptCardSelector.css";
import { get, post } from "../../utilities";

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
      this.setState({
        card: "test1",
      })
    });
  }

  skipCard = () => {
		get("/api/getNewPromptCard", {gameID : this.props.gameID}).then(data => (this.setState({card: data.card}))).catch(e => {
      console.error(e)
      this.setState({
        card: "test2",
      })
    });
  }

  selectCard = () => {
    post("/api/newGameID/selectCard", {card: this.state.card}).catch(e => {
      console.log(e);
      console.log("selected card");
    }).then(response => {
      this.setState({
        selectedCard : true,
      })
    }).catch(e => {
      console.log(e);
      this.setState({
        selectedCard: true,
      })
    });
  }

  render () {
    return (
      <div>
        <p>{this.state.card ? this.state.card : "Loading plz wait"}</p>
        <div>
          <button hidden={this.state.selectedCard} onClick = {this.skipCard}>Skip Card</button>
          <button hidden={this.state.selectedCard} onClick = {this.selectCard}>Select Card</button>
        </div>
      </div>
    )
  }
}

export default PromptCardSelector
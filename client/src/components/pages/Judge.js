import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Judge.css";
import PromptCardSelector from "../modules/PromptCardSelector.js";
import { socket } from "../../client-socket.js";
import WinnerSelector from "../modules/WinnerSelector.js";
import { get } from "../../utilities";
/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {string} gameID to display
 * 
 * States
 * @param {} 
 */

class Judge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState : 'promptSelector' // Store this information as a cookie because we don't want people refreshing and ending up in a different state
    }
  }
  
  componentDidMount() {
    socket.on("thinkingPlayers", (data) => {
      if (data.thinkingPlayers === 0) {
        this.setState({
          currrentState: 'selectingWinner'
        })
      }
    });
  }

  // Selecting the 
  render() { 
    return (
      <>
        <PromptCardSelector gameID={this.props.gameID} />
        {this.currentState === 'selectingWinner' ? <WinnerSelector gameID={this.props.gameID} /> : <p>Waiting for slowpokes</p>}
      </>
    );
  }
}

export default Judge;
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
 * @param {number} numThinkingPlayers
 * 
 * States
 * @param {} 
 */

class Judge extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  
  componentDidMount() {
  }

  // Selecting the 
  render() { 
    return (
      <>
        <PromptCardSelector gameID={this.props.gameID} />
        {this.props.numThinkingPlayers === 0 ? <WinnerSelector gameID={this.props.gameID} /> : <p>Waiting for slowpokes</p>}
      </>
    );
  }
}

export default Judge;
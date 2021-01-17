import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Player.css";
import PromptCardSelector from "../modules/PromptCardSelector.js";
//import socketIOClient from "select.io-client";
import WinnerSelector from "../modules/WinnerSelector.js";
import { get } from "../../utilities";
/*

State: Selecting prompt cards, Waiting, Selecting Winner

Remove in a moment    
*/



/**
 * Description of Player
 *
 * Proptypes
 * @param {string} gameID to display
 * 
 * States
 * @param {} 
 */

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState : 'promptSelector'
    }
  }
  
  componentDidMount() {

  }

  // Figuring out the black card code

  // Selecting the 
  render() { 
    return (
      <>
        <PromptCardSelector gameID={this.props.gameID} />
        <WinnerSelector gameID={this.props.gameID} />
      </>
    );
  }
}

export default Player;
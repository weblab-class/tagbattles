import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Player.css";
import ResponseSelector from "../modules/ResponseSelector.js";
import DisplayCard from "../modules/DisplayCard.js";
import JudgingReplica from "../modules/JudgingReplica.js";
import { socket } from "../../client-socket.js";
import { get, post } from "../../utilities";
/*
  prompt card at the top (should be loading until it is complete)
  gonna have your response cards
  when you click on one it sends that information over
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
      currentState: 'choosingResponse',
    }
  }
  
  componentDidMount() {
    socket.on("thinkingPlayers", (data) => {
      if (data.thinkingPlayers === 0) {
        this.setState({
          currrentState: 'judging'
        })
      }
    });
  }

  // Figuring out the black card code
  selectedResponse = () => {
    this.setState({
      currentState : 'judging'    
    })
  }

  // Selecting the 
  render() { 
    return (
      <>
        {this.state.card ? <DisplayCard text = {this.state.card}/> : <p>Loading</p>}
        {this.state.currentState === 'choosingResponse' ? <ResponseSelector submitResponse= {this.selectedResponse}/> :
        <JudgingReplica />}
      </>
    );
  }
}

export default Player;
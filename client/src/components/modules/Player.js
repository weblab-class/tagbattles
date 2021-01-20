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
      currentState: 0,
    }
  }
  
  componentDidMount() {

  }

  // Figuring out the black card code
  selectedResponse = () => {
    this.setState({
      currentState : 1    
    })
  }

  // Selecting the 
  render() { 
    return (
      <div className = "Player-container">
        {this.props.displayCard ? <DisplayCard text = {this.props.displayCard}/> : <p>Loading</p>}
        {<ResponseSelector displayingCard = {this.props.displayCard} submitResponse= {this.selectedResponse} gameID = {this.props.gameID} userID = {this.props.userID}/>}
      </div>
    );
  }
}

export default Player;
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
      currentCard: null,
    }
  }
  
  componentDidMount() {

  }

  // Figuring out the black card code
  selectedResponse = (selectedCard) => {
    this.setState({
      currentState : 1,
      currentCard: selectedCard,
    })
  }

  // Selecting the 
  render() { 
    return (
      <div className = "Player-container">
        {this.props.displayCard ? 
          <>
            <DisplayCard text = {this.props.displayCard} type = {0}/>
            {this.state.currentState === 0 ?
              <ResponseSelector 
                displayingCard = {this.props.displayCard} 
                submitResponse= {(card) => this.selectedResponse(card)} 
                gameID = {this.props.gameID} 
                userID = {this.props.userID}
              />
            :
              <div className = "Player-selected-card-display">
                <h2>Selected Card:</h2>
                <DisplayCard text = {this.state.currentCard} type = {1}/>
              </div>
            }
          </>
          : <p>Loading</p>}
      </div>
    );
  }
}

export default Player;
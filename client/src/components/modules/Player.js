import React, { Component } from "react";
import { Link } from "@reach/router";
import "./Player.css";
import ResponseSelector from "../modules/ResponseSelector.js";
import DisplayCard from "../modules/DisplayCard.js";
import Card from "../modules/Card.js"
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
 * @param {string} tentativeWinner the winner
 * 
 *  
 * States
 * @param {} 
 * 
 * How it works:
 *  When waiting for a card, we have to not be able to submit yet
 *  When we submit, it should show a waiting for everyone else to submit on the bottom
 *  After everyone submits, it should have the card at the bottom
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
    console.log("got here and selected a response");
    this.setState({
      currentState : 1,
      currentCard: selectedCard,
    })
  }

  // Selecting the 
  render() { 
    console.log(this.props.tentativeWinner);
    console.log("cuyrrent disaply", this.props.displayCard);
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
              (this.props.tentativeWinner ? 
              <Card 
                text={this.props.tentativeWinner}
                selectCard = { () => {console.log("this does nothing lol")}}
              /> : 
              <Card 
                text="Submitted cards will show up here shortly"
                selectCard = { () => {console.log("this does nothing lol")}}
              /> )
            }
          </>
          : <p>Loading</p>}
      </div>
    );
  }
}

export default Player;
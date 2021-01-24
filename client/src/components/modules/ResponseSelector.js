import React, { Component } from "react";
import { Link } from "@reach/router";
import "./ResponseSelector.css";
import Card from "./Card.js";
import { get, post } from "../../utilities";


/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {string} gameID to display
 * @param {string} playerID
 * @param {callback function} submitResponse 
 */
class ResponseSelector extends Component{
    constructor(props){
      super(props);
      this.state = {
        cards: ["This is a card","This is a second card"],
        selectedCard: null,
      }
    }
    
    submitCard = () => {
      post("/api/selectFinalResponse", {
          gameID: this.props.gameID, 
          playerID: this.props.userID, 
          cardIndex: this.state.selectedCardIndex,
        }).then(
          this.props.submitResponse(this.state.cards[this.state.selectedCardIndex])
        ).catch((e) => console.log("selected response"));
    }

    selectCard = (cardIndex) => {
      this.setState({
        selectedCardIndex: cardIndex,
      })
    }
    
    componentDidMount = () => {
      console.log(this.props.gameID);
      get("/api/getPlayerCards", {gameID: this.props.gameID, playerID: this.props.userID}).then((response) => {
        this.setState({
          cards : response.cards,
        })
      }).catch(e => {
        this.setState({
          cards: ["This is a card p","This is a second card p; ","This is a third card p"],
        })
      })
    }

    createNewID() { 
      return Math.random() * 1000000000 // gets a random number to use as temp ID. HACK
    }

    render(){
			return(
        <div className = "ResponseSelector-container">
          {console.log(this.state.cards)}
          <div className = "ResponseSelector-cards-container">
            {this.state.cards ? this.state.cards.map((o, id)=>
              (
                <Card 
                  key = {this.createNewID()}
                  text={o} 
                  isSelected={id === this.state.selectedCardIndex} 
                  selectCard = { () => {this.selectCard(id)}}
                />
              )
            ) : null}
          </div>
          <button hidden={!this.state.selectedCardIndex && this.props.displayingCard} onClick = {this.submitCard}>Final Card</button> {/* Should be blurred out until they have selected a card */}
        </div>
			)
		}
}

export default ResponseSelector;
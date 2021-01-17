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
        cards: [{cardID: "1", card: "This is a card"}, {cardID: "2", card: "This is a second card"}, {cardID: "3", card: "This is a third card"}],
        selectedCard: null,
      }
    }
    
    submitCard = () => {
      post("/api/selectFinalCard", {
          gameID: this.props.gameID, 
          playerID: this.props.playerID, 
          cardID: this.state.selectedCard
        }).then(
          this.props.submitResponse
        ).catch((e) => console.log("selected response"));
    }

    selectCard = (cardID) => {
      this.setState({
        selectedCard: cardID,
      })
    }
    
    componentDidMount = () => {
      get("/api/getPlayerCards", {gameID: this.props.gameID, playerID: this.props.playerID}).then((response) => {
        this.setState({
          cards : response.cards,
        })
      }).catch(e => {
        this.setState({
          cards: [{cardID: "1", card: "This is a card p"}, {cardID: "2", card: "This is a second card p; "}, {cardID: "3", card: "This is a third card p"}],
        })
      })
    }

    render(){
			return(
        <div>
          {this.state.cards ? this.state.cards.map((o)=>
            (
              <Card 
                key = {o.cardID}
                text={o.card} 
                isSelected={o.cardID === this.state.selectedCard} 
                selectCard = { () => {this.selectCard(o.cardID)}}
              />
            )
          ) : null}
          <button hidden={!this.state.selectedCard} onClick = {this.submitCard}>Final Card</button> {/* Should be blurred out until they have selected a card */}
        </div>
			)
		}
}

export default ResponseSelector;
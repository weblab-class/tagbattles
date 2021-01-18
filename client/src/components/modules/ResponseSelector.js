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
        cards: [{card: "This is a card"}, {card: "This is a second card"}],
        selectedCard: null,
      }
    }
    
    submitCard = () => {
      post("/api/selectFinalResponse", {
          gameID: this.props.gameID, 
          playerID: this.props.playerID, 
          card: this.state.selectedCard
        }).then(
          this.props.submitResponse
        ).catch((e) => console.log("selected response"));
    }

    selectCard = (card) => {
      this.setState({
        selectedCard: card,
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
          {this.state.cards ? this.state.cards.map((o, id)=>
            (
              <Card 
                key = {id}
                text={o.card} 
                isSelected={o.card === this.state.selectedCard} 
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
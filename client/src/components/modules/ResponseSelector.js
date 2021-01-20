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
          card: this.state.selectedCard
        }).then(
          this.props.submitResponse()
        ).catch((e) => console.log("selected response"));
    }

    selectCard = (card) => {
      this.setState({
        selectedCard: card,
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

    render(){
			return(
        <div className = "ResponseSelector-container">
          {console.log(this.state.cards)}
          <div className = "ResponseSelector-cards-container">
            {this.state.cards ? this.state.cards.map((o, id)=>
              (
                <Card 
                  key = {id}
                  text={o} 
                  isSelected={o === this.state.selectedCard} 
                  selectCard = { () => {this.selectCard(o)}}
                />
              )
            ) : null}
          </div>
          <button hidden={!this.state.selectedCard && this.props.displayingCard} onClick = {this.submitCard}>Final Card</button> {/* Should be blurred out until they have selected a card */}
        </div>
			)
		}
}

export default ResponseSelector;
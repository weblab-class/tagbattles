import React, { Component } from "react";
import { Link } from "@reach/router";
import "./WinnerSelector.css";
import Card from "./Card.js";
import { get, post } from "../../utilities";


/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {string} gameID to display
 */
class WinnerSelector extends Component{
    constructor(props){
      super(props);
      this.state = {
        playerCards: [{playerID: "1", card: "This is a card"}, {playerID: "2", card: "This is a second card"}, {playerID: "3", card: "This is a third card"}],
        selectedPlayer: null,
      }
    }
    
    selectWinner = () => {
      console.log("selecting winner");
      console.log("gameID: ", this.props.gameID);
      console.log("WinnerID: ", this.state.selectedPlayer);
      post("/api/selectWinnerAndUpdateJudge", {gameID: this.props.gameID, winnerID: this.state.selectedPlayer}).catch((e) => {
        console.log("selected winner");
        console.log(e);
      });;
    }

    selectCard = (playerID) => {
      this.setState({
        selectedPlayer: playerID,
      });
    }
    
    componentDidUpdate = () => {
      get("/api/getSubmittedResponses", {gameID: this.props.gameID}).then((response) => {
        this.setState({
          playerCards: response.playerCards,
        })
      }).catch((e) => {
        console.log(e);
        console.log("Component mounted :O");
      });
    }

    render(){
			return(
        <div>
          {this.state.playerCards ? this.state.playerCards.map((o)=>
            (
              <Card 
                key = {o.playerID}
                text={o.card} 
                isSelected={o.playerID === this.state.selectedPlayer} 
                selectCard = { () => {this.selectCard(o.playerID)}}
              />
            )
          ) : null}
          <button hidden={!this.state.selectedPlayer} onClick = {this.selectWinner}>Final Card</button>
        </div>
			)
		}
}

export default WinnerSelector;
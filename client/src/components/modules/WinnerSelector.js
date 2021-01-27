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
        playerCards: [],
        selectedPlayer: null,
        selectWinner: false,
      }
    }
    
    selectWinner = () => {
      console.log("selecting winner");
      console.log("gameID: ", this.props.gameID);
      console.log("WinnerID: ", this.state.selectedPlayer);
      this.setState({
        selectWinner : true,
      })
      post("/api/selectWinnerAndUpdateJudge", {gameID: this.props.gameID, winnerID: this.state.selectedPlayer}).catch((e) => {
        console.log("selected winner");
        console.log(e);
      }).then(() => {
        this.setState({
          selectWinner: false,
        })
      })
    }

    selectCard = (playerID) => {
      post('/api/selectTentativeWinner', {gameID : this.props.gameID, playerID: playerID})
      this.setState({
        selectedPlayer: playerID,
      });
    }
    
    componentDidUpdate = () => {
      get("/api/getSubmittedResponses", {gameID: this.props.gameID}).then((response) => {
        console.log(response, "my responses");
        this.setState({
          playerCards: response.playerCards,
        })
      }).catch((e) => {
        console.log(e);
        console.log("Component mounted :O");
      });
    }
    componentDidMount = () => {
      get("/api/getSubmittedResponses", {gameID: this.props.gameID}).then((response) => {
        console.log(response, "my responses");
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
        <div className = "WinnerSelector-container">
          <div className = "WinnerSelector-cards-container">
            {this.state.playerCards ? this.state.playerCards.map((o)=>
              (
                <Card 
                  key = {o.playerID}
                  text={o.card} 
                  isSelected={o.playerID === this.state.selectedPlayer} 
                  isFlipped={o.playerID !== this.state.selectedPlayer} 
                  selectCard = { () => {this.selectCard(o.playerID)}}
                />
              )
            ) : null}
          </div>
          <button className="WinnerSelector-submitButton" hidden={!this.state.selectedPlayer && !this.state.submittedPlayer} onClick = {this.selectWinner}>Final Card</button>
        </div>
			)
		}
}

export default WinnerSelector;
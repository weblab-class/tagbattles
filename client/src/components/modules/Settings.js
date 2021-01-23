import React, {Component} from 'react';
import { get, post } from "../../utilities";
import './Settings.css';
// import cards from "../../../../a_lot_of_cards.js";

/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {function} startGame to display
 * @param {array} deckList
 * @param {boolean} displayPlayerError
 * @param {String} host
 * @param {String} gameID
 * @param {Number} rounds
 * @param {String} deck
 */
class Settings extends Component {
  constructor(props) {
    super(props);
    // let uniqueTypes = []
    // for(let i =0 ; i < cards.length; i++){
    //   if(!uniqueTypes.includes(cards[i].expansion)){
    //     uniqueTypes.push(cards[i].expansion);
    //   }
    // }
    // console.log(uniqueTypes);
    this.state = {
      rounds: "3",
      deck: "",
      decks: [],
    }
  }

  componentDidMount(){
    get("/api/getDeckNames").then((data) => {
      this.setState({
        deck: data.map(cardPack => cardPack.name)[0],
        decks: data.map(cardPack => cardPack.name),
      });
    });
  }

  onRoundsChange = (newRound) => {
    post("/api/updateRounds", {gameID: this.props.gameID, rounds: newRound.target.value}).then((newStuff) => {
      console.log(newStuff);
      this.setState({
        rounds: newStuff
      });
    });
  }

  onDeckChange = (newDeck) => {
    post("/api/updateDeck", {gameID: this.props.gameID, deck: newDeck.target.value}).then((newStuff) => {
      console.log(newStuff);
      this.setState({
        deck: newStuff,
      });
    });
  }

  render() {
    console.log("joinedGame", this.props.joinedGame);
    const rounds = [2,3,4,5,6,7,8,9,10];
    return (
      <div className = "Settings-settings-side">
        <h2 className = "Settings-container-label">Settings</h2>
        <div className = "Settings-settings-container">
          <h4 className = "Settings-settings-label">Rounds</h4>
          {this.props.host?
          <select value = {this.props.rounds} name = "rounds-select" onChange = {this.onRoundsChange}>
            {rounds.map((num) => <option key = {`${num}`} value = {`${num}`}>{num}</option>)}
          </select>
          :
            <p className = "Settings-settings-value">{this.props.rounds}</p>
          }
          <h4 className = "Settings-settings-label">Deck</h4>
          {this.props.host?
            <select value = {this.props.deck} name = "deck-select" onChange = {this.onDeckChange}>
              {this.state.decks.map((deck) => <option key = {deck} value = {deck}>{deck}</option>)}
            </select>
          :
            <p className = "Settings-settings-value">{this.props.deck}</p>
          }
          {this.props.host?(
            <>
            {this.props.joinedGame ? 
              <>
                <button 
                  className = "Settings-start-game" 
                  onClick = {()=>this.props.startGame(this.state.rounds, [this.state.deck])}
                >
                  Enter Game
                </button> 
                <p className = "Settings-error" hidden = {!this.props.displayPlayerError}>Need at least 2 players to start</p>
              </>
            : 
              <p>Creating your game</p>}
            </>)
          :
            <p className = "Settings-inactive-button">Waiting for Host...</p>
          }
        </div>
      </div>
    )
  }
}

export default Settings;
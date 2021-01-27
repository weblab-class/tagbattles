import React, {Component} from 'react';
import Select from 'react-select';

import { get, post } from "../../utilities";
import CopyToClipboard from './CopyToClipboard.js';
import './Settings.css';
// import cards from "../../../../a_lot_of_cards.js";

/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {function} startGame to display
 * @param {boolean} displayPlayerError
 * @param {boolean} displayDeckError
 * @param {String} host
 * @param {String} gameID
 * @param {Number} rounds
 * @param {Array} decks
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
      selectedDecks: this.props.decks,
      decks: [],
    }
  }

  componentDidMount(){
    get("/api/getDeckNames").then((data) => {
      this.setState({
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
    console.log("NEWDECK: ", newDeck)
    post("/api/updateDecks", {gameID: this.props.gameID, decks: newDeck}).then((newStuff) => {
      console.log("NEW DECK :O :", newStuff.newDecks.map((deck) => deck.value));
      this.setState({
        selectedDecks: newStuff.newDecks.map((deck) => deck.value),
      });
    });
  }

  render() {
    console.log("joinedGame", this.props.joinedGame);
    console.log(this.state.decks);
    console.log("PROP DECKS: ", this.props.decks);
    const rounds = [2,3,4,5,6,7,8,9,10];
    return (
      <div className = "Settings-settings-side">
        <h1 className = "Settings-container-label">Settings</h1>
        <div className = "Settings-settings-container">
          <CopyToClipboard gameCode = {this.props.gameID}/>
          <h4 className = "Settings-settings-label">Rounds</h4>
          {this.props.host?
          <select value = {this.props.rounds} name = "rounds-select" onChange = {this.onRoundsChange}>
            {rounds.map((num) => <option key = {`${num}`} value = {`${num}`}>{num}</option>)}
          </select>
          :
            <p className = "Settings-settings-value">{this.props.rounds}</p>
          }
          <h4 className = "Settings-settings-label">Deck</h4>
          {/*<select value = {this.props.deck} name = "deck-select" onChange = {this.onDeckChange}>
            {this.state.decks.map((deck) => <option key = {deck} value = {deck}>{deck}</option>)}
          </select>*/}
          {this.props.host?
            <Select 
              defaultValue = {[]}
              isMulti
              name = "Decks"
              isSearchable
              onChange = {this.onDeckChange}
              placeholder="Select Decks to Use"
              autoFocus
              noOptionsMessage = {() => "Must select a deck!"}
              options = {this.state.decks.map((deck) => {return {value: deck, label: deck}})}
              className = "Settings-decks-selector"
            />
          :
            <div className = "Settings-decks-container">
              {this.props.decks.map((deck) => 
                <span key = {deck} className = "Settings-deck-label">
                  {deck}
                </span>
              )}
            </div>
          }
          {this.props.host?(
            <>
            {this.props.joinedGame ? 
              <>
                <button 
                  className = "Settings-start-game" 
                  onClick = {()=>this.props.startGame(this.state.rounds, this.state.selectedDecks)}
                >
                  Enter Game
                </button> 
                <p className = "Settings-error" hidden = {!this.props.displayPlayerError}>Need at least 3 players to start</p>
                <p className = "Settings-error" hidden = {!this.props.displayDeckError}>Need at least 1 deck to play</p>
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
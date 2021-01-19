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
    console.log(this.state.rounds);
    this.setState({
      rounds: newRound.target.value,
    })
  }

  onDeckChange = (newDeck) => {
    console.log(this.state.deck);
    this.setState({
      deck: newDeck.target.value,
    })
  }

  render() {
    const rounds = [2,3,4,5,6,7,8,9,10];
    return (
      <div className = "Settings-settings-side">
        <h2 className = "Settings-container-label">Settings</h2>
        <div className = "Settings-settings-container">
          <h4 className = "Settings-settings-label">Rounds</h4>
          <select value = {this.state.rounds} name = "rounds-select" onChange = {this.onRoundsChange}>
            {rounds.map((num) => <option key = {`${num}`} value = {`${num}`}>{num}</option>)}
          </select>
          <h4 className = "Settings-settings-label">Deck</h4>
          <select value = {this.state.deck} name = "deck-select" onChange = {this.onDeckChange}>
            {this.state.decks.map((deck) => <option key = {deck} value = {deck}>{deck}</option>)}
          </select>
          <button className = "Settings-start-game" onClick = {()=>this.props.startGame(this.state.rounds, [this.state.deck])}>Start Game</button>
        </div>
      </div>
    )
  }
}

export default Settings;
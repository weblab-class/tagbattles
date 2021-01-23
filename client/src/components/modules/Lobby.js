import React, { Component } from 'react';
import PlayerList from "./PlayerList.js";
import Settings from "./Settings.js";
import './Lobby.css';

/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {array} players to display
 * @param {function} startGame
 * @param {function} testFunction
 * @param {array} deckList
 * @param {boolean} displayPlayerError
 * @param {String} host
 * 
 */
class Lobby extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "Lobby-gamesettings-container">
        {console.log("Players inasdf adsf :",this.props.players)}
        <h1>Lobby</h1>
        <div className = "Lobby-game-container">
          <PlayerList players = {this.props.players} host = {this.props.host}/>
          <Settings 
            joinedGame = {this.props.joinedGame} 
            startGame = {this.props.startGame} 
            deckList = {this.props.deckList}
            displayPlayerError = {this.props.displayPlayerError}
          />
        </div>
        {/*<div className="Game-ResponseCard u-textCenter" onClick={this.props.testFunction}>Some response card</div>*/}
      </div>
    )
  }
}

export default Lobby;
import React, { Component } from 'react';
import PlayerList from "./PlayerList.js";
import Settings from "./Settings.js";
import GameChat from './GameChat.js';
import './Lobby.css';

/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {array} players to display
 * @param {function} startGame
 * @param {function} testFunction
 * @param {boolean} displayPlayerError
 * @param {boolean} displayDeckError
 * @param {String} host
 * @param {String} userID
 * @param {String} gameID
 * @param {Number} rounds
 * @param {Array} decks
 * @param {String} userName
 * @param {boolean} toBeAdded true when the game has started but the player is not yet a part of it.
 */
class Lobby extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className = "Lobby-gamesettings-container">
        {/* {console.log("Players inasdf adsf :",this.props.players)}
        {console.log("HOSTID: ", this.props.host)}
        {console.log("PLAYERID: ", this.props.userID)} */}
        <div className = "Lobby-game-container">
          {/*<PlayerList players = {this.props.players} host = {this.props.host}/>*/}
          <Settings 
            joinedGame = {this.props.joinedGame} 
            startGame = {this.props.startGame}
            displayPlayerError = {this.props.displayPlayerError}
            displayDeckError = {this.props.displayDeckError}
            host = {this.props.host === this.props.userID}
            gameID = {this.props.gameID}
            rounds = {this.props.rounds}
            decks = {this.props.decks}
          />
          {/*<GameChat
            userID = {this.props.userID}
            gameID = {this.props.gameID}
            userName = {this.props.userName}
            chats = {this.props.chats}
          />*/}
        </div>
        {/*<div className="Game-ResponseCard u-textCenter" onClick={this.props.testFunction}>Some response card</div>*/}
      </div>
    )
  }
}

export default Lobby;
import React, {Component} from 'react';
import PlayerListItem from './PlayerListItem.js';
import './PlayerList.css';

/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {array} players to display
 * @param {String} host
 */
class PlayerList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let playerList = "Loading...";
    console.log(this.props);
    if (this.props.players.length > 0) {
      playerList = this.props.players.map((player) => 
        <PlayerListItem 
          key = {player._id}
          player = {player}
          type = {this.props.host === player._id ? "Host" : "Player"}
        />
      )
    }
    return(
      <div className = "PlayerList-players-side">
        <h2 className = "PlayerList-container-label">Players</h2>
        <div className = "PlayerList-players-container">
          {playerList}          
        </div>
      </div>
    )
  }
}

export default PlayerList;
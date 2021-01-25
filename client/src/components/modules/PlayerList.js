import React, {Component} from 'react';
import PlayerListItem from './PlayerListItem.js';
import './PlayerList.css';

/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {array} players to display
 * @param {String} host
 * @param {String} stage (ingame or lobby)
 * @param {String} judgeID
 * @param {List} leaderboard
 * @param {String} playerID
 */
class PlayerList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let playerList = "Loading...";
    console.log(this.props);
    console.log("Leaderboard: ",this.props.leaderboard);
    if (this.props.players.length > 0) {
      playerList = this.props.leaderboard ? this.props.leaderboard : this.props.players;
      playerList = playerList.map((player) => 
        <PlayerListItem 
          key = {player._id}
          player = {player}
          stage = {this.props.stage}
          playerID = {this.props.playerID}
          label = {this.props.stage ? 
            (this.props.judgeID === player._id ? "Judge" : "Player")
          :
            (this.props.host === player._id ? "Host" : "Player")
          }
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
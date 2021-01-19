import React, {Component} from 'react';
import './PlayerList.css';

/**
 * Description of WinnerSelector
 *
 * Proptypes
 * @param {array} players to display
 */
class PlayerList extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let playerList = "Loading...";
    if (this.props.players.length > 0) {
      playerList = this.props.players.map((player, id) => 
        <div key={id} className = "PlayerList-player-container">
          <div className = "PlayerList-player-image-container">
            <img src = "" alt = "playerIcon" className = "PlayerList-player-image"/>
          </div> 
          <div className = "PlayerList-player-info-container">
            <h3 className = "PlayerList-name-label">{player.name}</h3>
            <p className = "PlayerList-points-label">{player.points} points</p>
            <span className = "PlayerList-label-icon">{player.type}</span>
          </div>
        </div>
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
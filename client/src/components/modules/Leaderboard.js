import React, { Component } from 'react';
import './Leaderboard.css';

/**
 * 
 * Props:
 * @param {array} leaderboard
 */
class Leaderboard extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = "Leaderboard-container">
        <div className = "Leaderboard-window">
          <h1 className = "Leaderboard-title">Leaderboard</h1>
          {this.props.leaderboard.map((player) => (
            <div className = "Leaderboard-player-container">
              {player.name}: {player.score}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Leaderboard;
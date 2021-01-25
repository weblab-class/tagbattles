import React, { Component } from 'react';
import './Leaderboard.css';
import LeaderboardPlayerIcon from './LeaderboardPlayerIcon.js';

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
        {console.log(this.props.leaderboard)}
        <div className = "Leaderboard-window">
          <h1 className = "Leaderboard-title">Leaderboard</h1>
          {this.props.leaderboard.map((player, index) => (
              <LeaderboardPlayerIcon key = {player._id} rank = {index} player = {player} />
          ))}
        </div>
      </div>
    )
  }
}

export default Leaderboard;
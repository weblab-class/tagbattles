import React, { Component }from 'react';
import './LeaderboardPlayerIcon.css';
import { get, post } from "../../utilities.js";
import Avatar from './Avatar.js';
import FirstPlace from './icons/firstplace.js';
import SecondPlace from './icons/secondplace.js';
import ThirdPlace from './icons/thirdplace.js';

//Ranking SVGs


const rankings = [<FirstPlace/>, <SecondPlace/>, <ThirdPlace/>];

/**
 * props
 * @param {Object} player
 * @param {Number} rank
 */
class LeaderboardPlayerIcon extends Component {
  constructor(props){
    super(props);
    this.state = {
      colorID: 0,
      hatID: 0,
      mouthID: 0,
      eyeID: 0,
    }
  }

  componentDidMount(){
    get("/api/getPlayer", {userID: this.props.player._id}).then((data) => {
      this.setState({
        colorID: data.colorID,
        hatID: data.hatID,
        mouthID: data.mouthID,
        eyeID: data.eyeID,
      })
    })
  }

  render(){
    return (
      <div className = {this.props.rank <= 2 ? `LeaderboardPlayerIcon-player-container LeaderboardPlayerIcon-${this.props.rank}` : "LeaderboardPlayerIcon-player-container"}>
        <div className = "LeaderboardPlayerIcon-player-image-container">
          {rankings[this.props.rank]}
          <Avatar
            colorID = {this.state.colorID}
            hatID = {this.state.hatID}
            mouthID = {this.state.mouthID}
            eyeID = {this.state.eyeID}
            width = "50px"
            height = "50px"
          />
        </div> 
        <div className = "LeaderboardPlayerIcon-player-info-container">
          <h3 className = "LeaderboardPlayerIcon-name-label">{this.props.player.name}</h3>
          <p className = "LeaderboardPlayerIcon-points-label">{this.props.player.score} points</p>
        </div>
      </div>
    )
  }
}

export default LeaderboardPlayerIcon;
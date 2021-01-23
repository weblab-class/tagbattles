import React, {Component} from 'react';
import './PlayerListItem.css';
import { get, post } from "../../utilities.js";
import Avatar from './Avatar.js';
/**
 * props
 * @param {Object} player
 */
class PlayerListItem extends Component {
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
    return(
      <div className = "PlayerListItem-player-container">
        <div className = "PlayerListItem-player-image-container">
          <Avatar
            colorID = {this.state.colorID}
            hatID = {this.state.hatID}
            mouthID = {this.state.mouthID}
            eyeID = {this.state.eyeID}
            width = "50px"
            height = "50px"
          />
        </div> 
        <div className = "PlayerListItem-player-info-container">
          <h3 className = "PlayerListItem-name-label">{this.props.player.name}</h3>
          <p className = "PlayerListItem-points-label">{this.props.player.points} points</p>
          <span className = "PlayerListItem-label-icon">{this.props.player.type}</span>
        </div>
      </div>
    )
  }
}

export default PlayerListItem;
import React, {Component} from 'react';
import './PlayerListItem.css';
import { get, post } from "../../utilities.js";
import Avatar from './Avatar.js';
/**
 * props
 * @param {Object} player
 * @param {String} label
 * @param {String} playerID
 */
class PlayerListItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      colorID: 0,
      hatID: 0,
      mouthID: 0,
      name,
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
        name: data.name,
      })
    })
  }

  render(){
    return(
      <div className = {this.props.playerID === this.props.player._id ? "PlayerListItem-player-container PlayerListItem-player-self" : "PlayerListItem-player-container"}>
        {console.log("STAGE:ASDFa ", this.props.player)}
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
          <h3 className = "PlayerListItem-name-label">{this.state.name}{this.props.playerID === this.props.player._id ? " (You)" : null}</h3>
          {this.props.stage ?
            <p className = "PlayerListItem-points-label">{this.props.player.score} points</p>
          :
            null
          }
          <span className = "PlayerListItem-label-icon">{this.props.label}</span>
        </div>
      </div>
    )
  }
}

export default PlayerListItem;
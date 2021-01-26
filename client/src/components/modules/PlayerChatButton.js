import React, {Component} from 'react';
import './PlayerChatButton.css';
import { get, post } from "../../utilities.js";
import Avatar from './Avatar.js';

/**
 * Props:
 * @param {String} player
 * @param {Function} openChat
 */
class PlayerChatButton extends Component {
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
      <div className = "PlayerChatButton-player-container">
        <div className = "PlayerChatButton-player-image-container">
          <Avatar
            colorID = {this.state.colorID}
            hatID = {this.state.hatID}
            mouthID = {this.state.mouthID}
            eyeID = {this.state.eyeID}
            width = "30px"
            height = "30px"
          />
        </div> 
        <h3 className = "PlayerChatButton-name-label">{this.props.player.name}</h3>
      </div>
    )
  }
}
export default PlayerChatButton;
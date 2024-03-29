import React, { Component } from 'react';
import './PlayerChatButton.css';
import ChatIcon from './icons/chat.js';
import PlayerChat from './PlayerChat.js';

/**
 * Props:
 * @param {String} userID
 * @param {String} location "left" or "right"
 */
class PlayerChatButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      opened: false,
    }
  }

  openChat = () => {
    this.setState({
      opened: true,
    })
  }

  closeChat = () => {
    this.setState({
      opened: false,
    })
  }

  render(){
    return(
      <div className = {this.props.location === 'left' ? "PlayerChatButton-container-left" : "PlayerChatButton-container-right"}>
        {this.state.opened ? 
          <PlayerChat userID = {this.props.userID} closeChat = {this.closeChat}/>
        :
          <button className = "PlayerChatButton-button">
            <ChatIcon func = {this.openChat} className = "PlayerChatButton-button"/>
          </button>
        }
      </div>
    )
  }
}

export default PlayerChatButton;
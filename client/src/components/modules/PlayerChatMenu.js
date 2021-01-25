import React, { Component } from 'react';
import './PlayerChatMenu.css';
import ChatIcon from './icons/chat.js';
import PlayerChat from './PlayerChat.js';

/**
 * Props:
 * @param {String} userID
 * @param {String} location "left" or "right"
 */
class PlayerChatMenu extends Component {
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
      <div className = {this.props.location === 'left' ? "PlayerChatMenu-container-left" : "PlayerChatMenu-container-right"}>
        {this.state.opened ? 
          <PlayerChat userID = {this.props.userID}/>
        :
          <button className = "PlayerChatMenu-button">
            <ChatIcon func = {this.openChat} className = "PlayerChatMenu-button"/>
          </button>
        }
      </div>
    )
  }
}

export default PlayerChatMenu;
import React, { Component } from 'react';
import './PlayerChat.css';
import BackArrow from './icons/fatback.js';
import { get, post } from "../../utilities.js";
import CloseButton from './icons/close.js';

/**
 * Props
 * @param {String} userID
 */
class PlayerChat extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewingChat: false,
      messages: [],
      chattingWith: "",
      newMessage: "",
      messageHistory: [],
    }
  }

  sendMessage = () => {

  }

  openChat = (playerID) => {
    this.setState({
      viewingChat: true,
      chattingWith: playerID,
    })
  }

  render(){
    return(
      <div className = "PlayerChat-container">
        <div className = "PlayerChat-top-container">
          <CloseButton func = {this.props.closeChat} location = "chat"/>
          <h2>{this.state.viewingChat ? this.chattingWith : "Chats"}</h2>
          {this.state.viewingChat ? 
            <BackArrow func = {this.closeChat}/>
          :
            null
          }
        </div>
        <div className = "PlayerChat-main-container">
          <div className = "PlayerChat-player-names">
            {this.messageHistory.map((chat) => {
              return (
                <PlayerChatButton player = {chat.player} openChat = {this.openChat} />
              )
            })}
          </div>
          <div className = "PlayerChat-player-chat">
            <div className = "PlayerChat-messages-container">

            </div>
            <div className = "PlayerChat-text-container">
              <form onSubmit = {this.sendMessage} className = "PlayerChat-text-container">
                <textarea className = "PlayerChat-text-input" />
                <button type = "submit" className = "PlayerChat-send-button">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PlayerChat;
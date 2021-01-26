import React, { Component } from 'react';
import './PlayerChat.css';
import BackArrow from './icons/fatback.js';
import { get, post } from "../../utilities.js";
import CloseButton from './icons/close.js';
import EditIcon from './icons/edit.js';

/**
 * Props
 * @param {String} userID
 */
class PlayerChat extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewingChat: false,
      currentState: "list",
      messages: [],
      chattingWith: "",
      newMessage: "",
      messageHistory: [],
    }
  }

  componentDidMount(){

  }

  sendMessage = () => {

  }

  openChat = (playerID) => {
    this.setState({
      currentState: "chat", //list, chat, or new
      chattingWith: playerID,
    })
  }

  closeChat = (playerID) => {
    this.setState({
      currentState: "list",
      chattingWith: "",
    })
  }

  render(){
    return(
      <div className = "PlayerChat-container">
        <div className = "PlayerChat-top-container">
          <div className = "PlayerChat-top-right">
            <CloseButton func = {this.props.closeChat} location = "chat"/>
          </div>
          <h2 className = "PlayerChat-label">{this.state.viewingChat ? this.chattingWith : "Chats"}</h2>
          <div className = {this.state.currentState === "list" ? "PlayerChat-top-left-one" : "PLayerChat-top-left"}>
            {this.state.currentState === "chat" || this.state.currentState === 'new' ? 
              <BackArrow func = {this.closeChat}/>
            :
              <EditIcon func = {() => {console.log("Hello");}} location = "chat"/>
            }
          </div>
        </div>
        <div className = "PlayerChat-main-container">
          <div className = "PlayerChat-player-names">
            {this.state.messageHistory.map((chat) => {
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
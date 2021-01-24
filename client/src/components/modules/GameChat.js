import React, { Component } from 'react';
import './GameChat.css';
import GameChatMessage from './GameChatMessage.js';
import { get, post } from "../../utilities.js";
/**
 * 
 * Props:
 * @param {String} userID
 * @param {String} gameID
 * @param {String} userName
 */
class GameChat extends Component {
  constructor(props){
    super(props);
    this.state = {
      chats: [],
      newMessage: "",
    }
  }

  textChange = (event) => {
    this.setState({
      newMessage: event.target.value,
    })
    console.log(this.state.newMessage);
  }

  submitMessage = () => {
    post("/api/postChatMessage", {gameID: this.props.gameID, userID: this.props.userID, message: this.state.newMessage, name: this.props.name}).then((data) => {
      this.setState({
        newMessage: "",
      })
    });
  }

  render(){
    return (
      <div className = "GameChat-chat-container">
        {console.log(this.props.chats)}
        <h2 className = "GameChat-chat-title">Chat</h2>
        <div className = "GameChat-message-container">
          {this.props.chats.map((chatItem, index) => (
            <GameChatMessage 
              sender = {chatItem.name} 
              alignRight = {chatItem.userID === this.props.userID} 
              message = {chatItem.message}
              key = {index}
            />
          ))}
        </div>
        <div className = "GameChat-text-input-container">
          <input type = "text" onChange = {this.textChange} className = "GameChat-text-input" value = {this.state.newMessage} placeholder = "new message"/>
          <button onClick = {this.submitMessage} className = "GameChat-text-sender">Send</button>
        </div>
      </div>
    )
  }
}

export default GameChat;
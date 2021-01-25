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

  onEnterKeyPressed = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false){
      e.preventDefault();
      this.submitMessage();
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({behavior: "smooth"});
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  componentDidMount(){
    this.scrollToBottom();
  }

  textChange = (event) => {
    if(event.target.value.length < 100){
      this.setState({
        newMessage: event.target.value,
      })
    }
    console.log(this.state.newMessage);
  }

  submitMessage = () => {
    if(this.state.newMessage.length > 0){
      post("/api/postChatMessage", {gameID: this.props.gameID, userID: this.props.userID, message: this.state.newMessage, name: this.props.userName}).then((data) => {
        this.setState({
          newMessage: "",
        })
      });
    }
  }

  render(){
    return (
      <div className = "GameChat-chat-container">
        {console.log(this.props.chats)}
        <h2 className = "GameChat-chat-title">Chat</h2>
        <div className = "GameChat-content-container">
          <div className = "GameChat-message-container">
            {this.props.chats.map((chatItem, index) => (
              <GameChatMessage 
                sender = {chatItem.name} 
                alignRight = {chatItem.userID === this.props.userID} 
                message = {chatItem.message}
                key = {index}
              />
            ))}
            <div style = {{float: "left", clear: "both"}} ref = {(el) => {this.messagesEnd = el;}}></div>
          </div>
          <div className = "GameChat-text-input-container">
            <form onSubmit = {this.submitMessage} className = "GameChat-text-input-container">
              <textarea type = "text" onChange = {this.textChange} onKeyDown = {this.onEnterKeyPressed} className = "GameChat-text-input" value = {this.state.newMessage} placeholder = "new message"/>
              <button type = "submit" className = "GameChat-text-sender">Send</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default GameChat;
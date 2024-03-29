import React, {Component} from 'react';
import './GameChatMessage.css';

/**
 * 
 * props:
 * @param {String} sender
 * @param {Boolean} alignRight
 * @param {String} message
 */
class GameChatMessage extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <div className = {this.props.alignRight ? 'GameChatMessage-container-right' : 'GameChatMessage-container-left'}>
        <div className = "GameChatMessage-sender-container">
          <h5 className = {this.props.alignRight ? 'GameChatMessage-message-user' : 'GameChatMessage-message-sender'}>{this.props.sender}</h5>
        </div>
        <div className = {this.props.alignRight ? 'GameChatMessage-message-container-user' : 'GameChatMessage-message-container-general'}>
          <p className = "GameChatMessage-message">{this.props.message}</p>
        </div>
      </div>
    )
  }
}

export default GameChatMessage
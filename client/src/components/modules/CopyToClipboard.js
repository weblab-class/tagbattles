import React, { Component } from 'react';
import './CopyToClipboard.css';
import ClipboardIcon from './icons/clipboardIcon.js';

/**
 * Props
 * @param {String} gameCode
 */
class CopyToClipboard extends Component {
  constructor(props){
    super(props);
  }

  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
  }

  render(){
    return(
      <div className = "CopyToClipboard-container">
        <h5 className = "CopyToClipboard-title">Game Room Code</h5>
        <div className = "CopyToClipboard-link-holder">
          <textarea className = "CopyToClipboard-link" readOnly ref = {(textarea) => this.textArea = textarea} value = {this.props.gameCode} />
          <ClipboardIcon func = {this.copyToClipboard} className = "CopyToClipboard-icon"/>
        </div>
      </div>
    )
  }
}

export default CopyToClipboard;
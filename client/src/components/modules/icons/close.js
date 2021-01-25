{/*<!-- Generator: Adobe Illustrator 25.1.0, SVG Export Plug-In  -->*/}
import React, { Component } from 'react';
import './close.css';
import './iconstyles.css';

/**
 * 
 * @param {Function} func
 * @param {String} location 
 */
const CloseButton = (props) => {
  return(
    <div onClick = {props.func}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="994.3px"
        height="994.3px" viewBox="0 0 994.3 994.3" className = {props.location === 'nav' ? "CloseButton-styling-nav" : (props.location === 'chat' ? "CloseButton-styling-chat" : (props.location === 'name' ? "CloseButton-styling-name" : "Icon-icon-styling CloseButton-styling"))}>
      <defs>
      </defs>
      <path d="M153.5,967.6l814.1-814.1c35.1-35.1,35.1-92.1,0-127.2l0,0c-35.1-35.1-92.1-35.1-127.2,0L26.3,840.4
        c-35.1,35.1-35.1,92.1,0,127.2l0,0C61.5,1002.7,118.4,1002.7,153.5,967.6z"/>
      <path d="M840.8,968L26.7,153.9c-35.1-35.1-35.1-92.1,0-127.2l0,0c35.1-35.1,92.1-35.1,127.2,0L968,840.8
        c35.1,35.1,35.1,92.1,0,127.2l0,0C932.9,1003.1,875.9,1003.1,840.8,968z"/>
      </svg>
    </div>
  )
}

export default CloseButton;
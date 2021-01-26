{/*<!-- Generator: Adobe Illustrator 25.1.0, SVG Export Plug-In  -->*/}
import React from 'react';
import './iconstyles.css';
import './edit.css';
/**
 * Props
 * @param {function} func 
 * @param {String} location
 */
const EditIcon = (props) => {
  return(
    <div onClick = {props.func}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="972.8px"
        height="1003.3px" viewBox="0 0 972.8 1003.3" className = {props.location === 'chat' ? "Edit-styling-chat" : "Icon-icon-styling Edit-icon-sizing"}>
      <defs>
      </defs>
      <path d="M885,576.3v367.4c0,32.9-26.7,59.6-59.6,59.6H59.6c-32.9,0-59.6-26.7-59.6-59.6V177.9c0-32.9,26.7-59.6,59.6-59.6H427
        c21.5,0,39,17.5,39,39v0c0,21.5-17.5,39-39,39H78v729h729v-349c0-21.5,17.5-39,39-39h0C867.5,537.3,885,554.7,885,576.3z"/>
      <path d="M963.3,75.6L897.2,9.4c-12.6-12.6-33-12.6-45.5,0l-440,440l0.2,0.2l-117.1,218c-3.6,6.7,3.7,13.9,10.3,10.3l218-117.1
        l0.2,0.2l440-440C975.9,108.6,975.9,88.2,963.3,75.6z M371.9,600.9l63.3-117.8l54.5,54.5L371.9,600.9z M514.5,515.8l-57-57l333-333
        l57,57L514.5,515.8z M871.5,158.8l-57-57L878,38.3l57,57L871.5,158.8z"/>
      </svg>
    </div>
  )
}

export default EditIcon


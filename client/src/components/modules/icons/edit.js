{/*<!-- Generator: Adobe Illustrator 25.1.0, SVG Export Plug-In  -->*/}
import React, { Component} from 'react';
import './iconstyles.css';
import './edit.css';
/**
 * Props
 * @param {function} func 
 */
const EditIcon = (props) => {
  return(
    <div onClick = {props.func}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
        width="1054.6px" height="1046.9px" viewBox="0 0 1054.6 1046.9" className = "Icon-icon-styling Edit-icon-sizing">
        <defs>
        </defs>
        <path className="st0" d="M932,410.9v513.4c0,51.1-41.5,92.6-92.6,92.6H122.6c-51.1,0-92.6-41.5-92.6-92.6V207.5
          c0-51.1,41.5-92.6,92.6-92.6H636"/>
        <path className="st0" d="M1008.3,124.6L567.2,565.7L436.4,619c-0.6,0.2-1.1-0.3-0.9-0.9l53.3-130.8L930,46.2c21.6-21.6,56.7-21.6,78.4,0
          l0,0C1030,67.9,1030,103,1008.3,124.6z"/>
        <line className="st1" x1="488.8" y1="487.4" x2="567.2" y2="565.7"/>
      </svg>
    </div>
  )
}

export default EditIcon


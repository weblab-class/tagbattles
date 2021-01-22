import React from 'react';
import './iconstyles.css';
import './arrow.css';

/**
 * props:
 * @param {function} func
 */
const LeftArrow = (props) => {
  return(
    <div onClick = {props.func}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="1300.4px" height="636.9px" viewBox="0 0 1300.4 636.9" className = "Arrow-sizing Icon-icon-styling">
        <g>
          <path d="M384.2,437l882.1,0c18.9,0,34.2-15.3,34.2-34.2V232.7c0-18.9-15.3-34.2-34.2-34.2H384.2c-18.9,0-34.2,15.3-34.2,34.2v170.1
            C350,421.7,365.3,437,384.2,437z"/>
        </g>
        <path d="M9.4,301.3L480.6,3.2c13.5-8.6,31.1,1.2,31.1,17.2v596.2c0,16-17.6,25.7-31.1,17.2L9.4,335.6
          C-3.1,327.6-3.1,309.2,9.4,301.3z"/>
      </svg>
    </div>
  )
}

export default LeftArrow;
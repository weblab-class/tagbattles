import React from 'react';
import './iconstyles.css';
import './arrow.css';
/**
 * props
 * @param {function} func 
 */
const RightArrow = (props) => {
  return (
    <div onClick = {props.func}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="1300.4px" height="636.9px" viewBox="0 0 1300.4 636.9" className = "Icon-icon-styling Arrow-sizing">
        <g>
          <path d="M916.2,437H34.2C15.3,437,0,421.7,0,402.8l0-170.1c0-18.9,15.3-34.2,34.2-34.2h882.1c18.9,0,34.2,15.3,34.2,34.2v170.1
            C950.4,421.7,935.1,437,916.2,437z"/>
        </g>
        <path d="M1291,301.3L819.8,3.2c-13.5-8.6-31.1,1.2-31.1,17.2v596.2c0,16,17.6,25.7,31.1,17.2L1291,335.6
          C1303.6,327.6,1303.6,309.2,1291,301.3z"/>
      </svg>
    </div>
  )
}

export default RightArrow;
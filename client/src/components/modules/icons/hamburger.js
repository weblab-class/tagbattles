/*<!-- Generator: Adobe Illustrator 25.1.0, SVG Export Plug-In  -->*/
import React from 'react';
import './hamburger.css';

/**
 * 
 * @param {Function} func 
 */
const HamburgerIcon = (props) => {
  return(
    <div onClick = {props.func}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="934px"
        height="769px" viewBox="0 0 934 769" className = "HamburgerIcon-styling">
      <defs>
      </defs>
      <g>
        <path d="M848.5,169h-764C37.8,169,0,131.2,0,84.5v0C0,37.8,37.8,0,84.5,0h764C895.2,0,933,37.8,933,84.5v0
          C933,131.2,895.2,169,848.5,169z"/>
      </g>
      <g>
        <path d="M849.5,469h-764C38.8,469,1,431.2,1,384.5v0C1,337.8,38.8,300,85.5,300h764c46.7,0,84.5,37.8,84.5,84.5v0
          C934,431.2,896.2,469,849.5,469z"/>
      </g>
      <g>
        <path d="M849.5,769h-764C38.8,769,1,731.2,1,684.5v0C1,637.8,38.8,600,85.5,600h764c46.7,0,84.5,37.8,84.5,84.5v0
          C934,731.2,896.2,769,849.5,769z"/>
      </g>
      </svg>
    </div>
  )
}

export default HamburgerIcon;
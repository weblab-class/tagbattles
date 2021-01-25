/*<!-- Generator: Adobe Illustrator 25.1.0, SVG Export Plug-In  -->*/
import React from 'react';
import './editPencil.css';

/**
 * 
 * Props
 * @param {Function} func 
 * @param {String} location
 */
const EditPencil = (props) => {
  return(
    <div onClick = {props.func} className = {props.location === 'name' ? "EditPencil-leftmargin" : null}>
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="1015.2px" height="1015px" viewBox="0 0 1015.2 1015" className = "EditPencil-styling">
      <defs>
      </defs>
      <g>
        <polygon points="847.3,345.7 181.4,1011.6 181.2,1011.4 181.2,1011.4 0,1015 3.6,833.9 669.5,167.9 	"/>
      </g>
      <g>
        <path d="M1002.1,191L897.7,295.3L720,117.5L824.3,13.2c17.6-17.6,46-17.6,63.6,0l114.2,114.2C1019.6,144.9,1019.6,173.4,1002.1,191
          z"/>
      </g>
      </svg>
    </div>
  )
}

export default EditPencil;
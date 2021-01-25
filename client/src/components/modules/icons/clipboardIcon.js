/*<!-- Generator: Adobe Illustrator 25.1.0, SVG Export Plug-In  -->*/
import React from 'react';
import './clipboardIcon.css';

/**
 * Props
 * @param {Function} func 
 */
const ClipboardIcon = (props) => {
  return (
    <div onClick = {props.func} className = "ClipboardIcon-container">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1001px"
        height="1117px" viewBox="0 0 1001 1117" className = "ClipboardIcon-styling">
      <defs>
      </defs>
      <g>
        <path d="M851,591V209c0-28-22.3-50.8-49.8-50.8H581c0-23.9-5.2-46.6-14.5-66.9C541.8,37.4,488.2,0,426,0
          c-61.1,0-113.9,36-139.1,88.5c-10.2,21.1-15.9,44.8-15.9,69.8H49.8C22.3,158.3,0,181,0,209v857.2c0,28.1,22.3,50.8,49.8,50.8h751.5
          c27.5,0,49.8-22.7,49.8-50.8V896h-62v158.7H63V371.6h726V591H851z M125,316.5c0.5-45.2,36.6-81.7,81-81.7h50
          c11,0,21.5-2.4,30.9-6.8c26-12,44.1-38.8,44.1-69.8h0.1c0-1.2-0.1-2.4-0.1-3.6c0-55.5,44.1-100.6,98.5-100.6s98.5,45,98.5,100.6
          c0,1.2,0,2.4-0.1,3.6h0.1c0,28.8,15.5,53.8,38.5,66.9c10.8,6.2,23.2,9.7,36.5,9.7h50c44.4,0,80.5,36.5,81,81.7H125z"/>
      </g>
      <rect x="618" y="673" width="383" height="141"/>
      <polygon points="469,743.9 637,914.8 637,573 "/>
      <rect x="125" y="446" width="390" height="80"/>
      <rect x="125" y="602" width="175" height="80"/>
      <rect x="125" y="758" width="175" height="80"/>
      <rect x="125" y="914" width="290" height="80"/>
      </svg>
    </div>
  )
}

export default ClipboardIcon;
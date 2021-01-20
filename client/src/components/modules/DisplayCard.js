import React, {Component} from "react";
import "./DisplayCard.css";

/**
 * Description of DisplayCard
 *
 * Proptypes
 * @param {string} text to display
 * @param {number} type, 0 = black, 1 = white
 */
class DisplayCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  
  render () {
    return (
      <div className = {this.props.type===0 ? "DisplayCard-card-container" : "Game-ResponseCard"}>
        <p>{this.props.text}</p>
      </div>
    )
  }
}

export default DisplayCard;
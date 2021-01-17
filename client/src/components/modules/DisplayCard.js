import React, {Component} from "react";
import "./DisplayCard.css";

/**
 * Description of DisplayCard
 *
 * Proptypes
 * @param {string} text to display
 */
class DisplayCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  
  render () {
    return (
      <div>
        <p>{this.props.text}</p>
      </div>
    )
  }
}

export default DisplayCard;
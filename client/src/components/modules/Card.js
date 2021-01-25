import React, {Component } from "react";
import "./Card.css";

// Pass in the card information as text
/*
  props:
  @isSelected
  @
*/
class Card extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return (
      <>
        <div onClick = {this.props.selectCard} className = "card-container">
          <div className = {this.props.isSelected ? "card-inner is-selected" :  "card-inner"}>
            <div className = "card-ResponseCard card-face thefront">
              {this.props.isFlipped ? "Click me to view" : <p>{this.props.text}</p>}
            </div>
          </div>
        </div> 
      </>
    )
  }
}

export default Card;
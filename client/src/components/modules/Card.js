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
          <div className = {this.props.isSelected ? "card-inner is-flipped" : "card-inner"}>
            <div className = "Game-ResponseCard card-face thefront">
              <p>{this.props.text}</p>
            </div>
            <div className = "Game-ResponseCard card-face theback">
              <p>This card is currently selected.</p>
            </div>
          </div>
        </div> 
      </>
    )
  }
}

export default Card;
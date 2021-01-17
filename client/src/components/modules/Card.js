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
      <div onClick = {this.props.selectCard} className = "Game-ResponseCard">
        <p>{this.props.text}</p>
        {this.props.isSelected ? (<p>Selected!!!!!</p>) : null}
      </div> 
    )
  }
}

export default Card;
import React, { Component } from "react";

/**
 * @props
 * 
 * {text}: the text to display
 * {onChange}: the function to call when someone edits this
 * {onDelete}: the function to call when someone deletes this card
 * Structure:
 *  --Deck builder screen.
 *    --Allows you to name the deck and add/remove/edit cards.
 */

class EditableCard extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }


    render() {
      return (
        <>
            <img src="../trash.jpeg" alt="Delete" onClick={this.props.onDelete} />
            <input type="text" value={this.props.text} onChange={(data)=>{this.props.onChange(data)}} />
        </>
      );
    }
  }
  
  export default EditableCard;
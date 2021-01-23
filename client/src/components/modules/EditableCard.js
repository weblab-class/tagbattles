import React, { Component } from "react";
import "./EditableCard.css";
import trash from "../../public/trash.png";
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
        
        <div className="EditableCard-parent">
            <span contentEditable="true" className="EditableCard-textInput" type="text" 
              onInput={(data)=>{this.props.onChange(data.currentTarget.textContent)}} value={this.props.text} />
            <img className="EditableCard-trashImage" src={trash} alt="Delete" onClick={this.props.onDelete} />
        </div>
      );
    }
  }
  
  export default EditableCard;
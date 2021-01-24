import React, { Component } from "react";
import "./EditableCard.css";
import "./EditableCardPrompt.css";
import "./EditableCardResponse.css";
import trash from "../../public/trash.png";
/**
 * @props
 * 
 * {text}: the text to display
 * {type}: "prompt" or "response"
 * 
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
      console.log(this.props.isValid)
      return (
        <div className={"EditableCard-card-container EditableCard-parent-"+ (this.props.isValid ? this.props.type : "invalid")}>
            <span contentEditable="true" className={"EditableCard-textInput EditableCard-textInput-"+this.props.type} type="text" 
              onInput={(data)=>{this.props.onChange(data.currentTarget.textContent)}} value={this.props.text} />
            <img className="EditableCard-trashImage" src={trash} alt="Delete" onClick={this.props.onDelete} />
        </div>
      );
    }
  }
  
  export default EditableCard;
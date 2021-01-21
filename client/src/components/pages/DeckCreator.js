import React, { Component } from "react";
import EditableCard from "../modules/EditableCard.js"
import GoogleLogin from "react-google-login";
import { get, post } from "../../utilities.js";
const GOOGLE_CLIENT_ID = "640440795885-4do41cm5va1aumbs67c398b1m8m2574o.apps.googleusercontent.com";


/**
 * @props
 * 
 * {Deck}: Pass in a deck.
 * 
 * Structure:
 *  --Deck builder screen.
 *    --Allows you to name the deck and add/remove/edit cards.
 */

class DeckCreator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error_message: "Name must be atleast 4 characters",
        deck_name: "",
        prompt_cards: [], // Stored as a list of strings
        response_cards: [],
      }
    }
    isNameUnique(name) {
        get("/api/isNameUnique", {name: name}).then((res)=>{
            if(res.isUnique) {
                this.setState({
                    error_message: null,
                })
            }
            else{
                this.setState({
                    error_message: "Name is taken, try something else",
                })
            }
        }).catch((e)=>console.log(e))
    }
    handleDeckNameChange(event) {
        this.setState({
            deck_name: event.target.value
        })
        if(event.target.value.length < 4) {
            this.setState({
                error_message: "Name must be atleast 4 characters",
            })
        }
        else if(event.target.value.length > 20) {
            this.setState({
                error_message: "Name is too long"
            })
        }
        else {
            this.isNameUnique(event.target.value)
        }
    }

    

    handleCardChange(value, index, card_type) {
        this.setState({
            [card_type]: [...this.state[card_type].slice(0, index), value, ...this.state[card_type].slice(index+1)]
        })
    }

    handleCardAddition(card_type) {
        this.setState({
            [card_type]: [...this.state[card_type], ""]
        })
    }

    submitDeck() {
        console.log("attempting to submit")
        post("/api/submitDeck", 
            {name: this.state.deck_name, 
            prompt_cards : this.state.prompt_cards, 
            response_cards: this.state.response_cards}).then((res) => {
                console.log("submitted deck");
            }).catch((e)=>console.log(e))
    }

    handeCardRemoval(index, card_type) {
        this.setState({
            [card_type]: [...this.state[card_type].slice(0, index), ...this.state[card_type].slice(index+1)]
        })
    }


    render() {
      return (
        <>
            
            <p>Your deck will be called</p>
            <input type="text" value={this.state.deck_name} onChange={(event)=>this.handleDeckNameChange(event)} />
            <p>{this.state.error_message}</p>
            <div>
                <div>
                    <button onClick={()=>this.handleCardAddition('prompt_cards')}>AddPrompt</button>
                    {this.state.prompt_cards.map((text, id) => (
                        <EditableCard key={id} text={text} 
                            onDelete={()=>this.handeCardRemoval(id, 'prompt_cards')} 
                            onChange={(data)=>this.handleCardChange(data.target.value, id, 'prompt_cards')} />
                    ))}
                </div>
                <div>
                    <button onClick={()=>this.handleCardAddition('response_cards')}>AddResponse</button>
                    {this.state.response_cards.map((text, id) => (
                        <EditableCard key={id} text={text} 
                            onDelete={()=>this.handeCardRemoval(id, 'response_cards')} 
                            onChange={(data)=>this.handleCardChange(data.target.value, id, 'response_cards')} />
                    ))}
                </div>
            </div>
            {!this.state.error_message ? <button onClick={()=>this.submitDeck()}>SubmitDeck</button> : <p>Correct errors to submit</p>}
        </>
      );
    }
  }
  
  export default DeckCreator;
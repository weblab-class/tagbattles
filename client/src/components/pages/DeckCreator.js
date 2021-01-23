import React, { Component } from "react";
import EditableCard from "../modules/EditableCard.js"
import GoogleLogin from "react-google-login";
import { get, post } from "../../utilities.js";
import plus from "../../public/plus.png";
import "./DeckCreator.css"
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

    createNewID() { 
        return Math.random() * 1000000000 // gets a random number to use as ID
    }

    handleCardChange(value, index, card_type) {
        this.setState({
            [card_type]: [...this.state[card_type].slice(0, index), {card: value, id: this.state[card_type][index].id}, ...this.state[card_type].slice(index+1)]
        })
    }

    handleCardAddition(card_type) {
        this.setState({
            [card_type]: [...this.state[card_type], {card: "", id: this.createNewID()}]
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
        console.log(index);
        this.setState({
            [card_type]: [...this.state[card_type].slice(0, index), ...this.state[card_type].slice(index+1)]
        })
    }


    render() {
      return (
        <>
            <span>Deck Name:
            <input type="text" value={this.state.deck_name} onChange={(event)=>this.handleDeckNameChange(event)} />
            </span>
            <span> Oops! {this.state.error_message}</span>
            <div className="u-flex">
                <div className="u-flexColumn deck-subContainer">
                    <img class="DeckCreator-plus" src={plus} onClick={()=>this.handleCardAddition('prompt_cards')} />
                    {this.state.prompt_cards.map((content, id) => (
                        <EditableCard key={content.id} text={content.card} 
                            onDelete={()=>this.handeCardRemoval(id, 'prompt_cards')} 
                            onChange={(data)=>this.handleCardChange(data, id, 'prompt_cards')} />
                    ))}
                </div>
                <div className="u-flexColumn deck-subContainer">
                <img class="DeckCreator-plus" src={plus} onClick={()=>this.handleCardAddition('response_cards')} />
                    {this.state.response_cards.map((content, id) => (
                        <EditableCard key={content.id} text={content.card} 
                            onDelete={()=>this.handeCardRemoval(id, 'response_cards')} 
                            onChange={(data)=>this.handleCardChange(data, id, 'response_cards')} />
                    ))}
                </div>
            </div>
            {!this.state.error_message ? <button onClick={()=>this.submitDeck()}>SubmitDeck</button> : <p>Correct errors to submit</p>}
        </>
      );
    }
  }
  
  export default DeckCreator;
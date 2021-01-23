import React, { Component } from "react";
import EditableCard from "../modules/EditableCard.js"
import GoogleLogin from "react-google-login";
import { get, post } from "../../utilities.js";
import plus from "../../public/plus.png";
import "./DeckCreator.css"

/**
 * @props
 * 
 * 
 * Structure:
 *  --Deck builder screen.
 *    --Allows you to name the deck and add/remove/edit cards.
 */

class DeckCreator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error_message: "You need at least one card!",
        deck_name: "Enter Deck Name",
        prompt_cards: [], // Stored as a list of strings
        response_cards: [],
      }
    }

    async isNameUnique(name) {
        console.log("eh")
        let res = await get("/api/isNameUnique", {name: name})
    
        if(res.isUnique) {
            this.setState({
                error_message: null,
            })
            console.log("returned t")
            return true;
        }
        else{
            this.setState({
                error_message: "Name is taken, try something else!",
            })
            console.log("returned f")
            return false;
        }
    }

    handleDeckNameChange(text) {
        
        this.setState({
            deck_name: text
        }, () => this.areCardsValid())
    }

    createNewID() { 
        return Math.random() * 1000000000 // gets a random number to use as temp ID. HACK
    }

    handleCardChange(value, index, card_type) {
        this.setState({
            [card_type]: [...this.state[card_type].slice(0, index), {card: value, id: this.state[card_type][index].id}, ...this.state[card_type].slice(index+1)]
        }, () => this.areCardsValid())
    }

    handleCardAddition(card_type) {
        this.setState({
            [card_type]: [...this.state[card_type], {card: "", id: this.createNewID()}]
        }, () => this.areCardsValid())
    }
    isCardValid(card) {
        return /\S/.test(card) && card.length > 0;
    }

    async areCardsValid(){
        if (this.state.prompt_cards.length === 0 && this.state.response_cards.length === 0) {
            this.setState({error_message: "You need at least one card."}); return;
        }
        for (let i = 0; i < this.state.prompt_cards.length; i++) {
            if (!this.isCardValid(this.state.prompt_cards[i].card)){ this.setState({error_message: "No empty cards allowed!"}); return;}
        }
        for (let i = 0; i < this.state.response_cards.length; i++) {
            if (!this.isCardValid(this.state.response_cards[i].card)){ this.setState({error_message: "No empty cards allowed!"}); return;}
        }
        if (this.state.deck_name.length < 4) {
            this.setState({error_message: "Deck name too short. Need > 3 characters!"})
            return ;
        }
        else{ 
            let valid = await this.isNameUnique(this.state.deck_name)
            console.log(valid);
            if (!valid) {
                return ;
            }
        }
        this.setState({
            error_message: null
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
        }, () => this.areCardsValid())
    }

    componentDidMount() {
        this.areCardsValid();
    }


    render() {
      return (
        <>
            <div className="DeckCreator-deck-name-container">
                <input className="DeckCreator-deck-name-input DeckCreator-deck-name" contentEditable="true" type="text" value={this.state.deck_name} onInput={(event)=>this.handleDeckNameChange(event.target.value)} value={this.state.deck_name} />
            </div>
           
            {this.state.error_message ? <span>Oops! {this.state.error_message}</span> : null }
            <span>{!this.state.error_message ? <button className = "DeckCreator-submit-deck" onClick={()=>this.submitDeck()}>SubmitDeck</button> : null}</span>
            <div className="u-flex">
                <div className="u-flexColumn deck-subContainer">
                    <img class="DeckCreator-plus" src={plus} onClick={()=>this.handleCardAddition('prompt_cards')} />
                    {this.state.prompt_cards.map((content, id) => (
                        <EditableCard key={content.id} text={content.card} 
                            type="prompt"
                            onDelete={()=>this.handeCardRemoval(id, 'prompt_cards')} 
                            onChange={(data)=>this.handleCardChange(data, id, 'prompt_cards')} />
                    ))}
                </div>
                <div className="u-flexColumn deck-subContainer">
                <img className="DeckCreator-plus" src={plus} onClick={()=>this.handleCardAddition('response_cards')} />
                    {this.state.response_cards.map((content, id) => (
                        <EditableCard key={content.id} text={content.card} 
                            type="response"
                            onDelete={()=>this.handeCardRemoval(id, 'response_cards')} 
                            onChange={(data)=>this.handleCardChange(data, id, 'response_cards')} />
                    ))}
                </div>
            </div>
        </>
      );
    }
  }
  
  export default DeckCreator;
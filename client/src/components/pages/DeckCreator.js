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
      this.MAX_CARD_LENGTH = 120;
      this.state = {
        error_message: "You need at least one card!",
        deck_name: "",
        prompt_cards: [], // Stored as a list of strings
        response_cards: [],
      }
    }

    

    async isNameUnique(name) {
        let res = await get("/api/isNameUnique", {name: name})
    
        if(res.isUnique) {
            this.setState({
                error_message: null,
            })
            return true;
        }
        else{
            this.setState({
                error_message: "Name is taken, try something else!",
            })
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
        return /\S/.test(card) && card.length > 0 && card.length < this.MAX_CARD_LENGTH
    }

    async areCardsValid(){
        if (this.state.prompt_cards.length === 0 && this.state.response_cards.length === 0) {
            this.setState({error_message: "You need at least one card."}); return;
        }
        for (let i = 0; i < this.state.prompt_cards.length; i++) {
            if (!this.isCardValid(this.state.prompt_cards[i].card)){ 
                this.setState({error_message: "Some cards seem to be empty or too long!"}); return;
            }
        }
        for (let i = 0; i < this.state.response_cards.length; i++) {
            if (!this.isCardValid(this.state.response_cards[i].card)){ 
                this.setState({error_message: "Some cards seem to be empty or too long!"}); return;
            }
        }
        if (this.state.deck_name.length < 4) {
            this.setState({error_message: "Deck name too short. Need at least 4 characters!"})
            return ;
        }
        else if (this.state.deck_name.length > 35) {
            this.setState({error_message: "Deck name too long."})
            return ;
        }
        else{ 
            let valid = await this.isNameUnique(this.state.deck_name)
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
        post("/api/createDeck", 
            {name: this.state.deck_name, 
            prompt_cards : this.state.prompt_cards.map((element) => {
							return element.card;
						}), 
            response_cards: this.state.response_cards.map((element) => {
							return element.card;
						})
					}).then((res) => {
                console.log("submitted deck"); alert("Deck has been saved! You can choose it while you create a new game."); this.setState({error_message: "You need at least one card!", response_cards: [], prompt_cards: [], deck_name: ""});
					}).catch((e)=>console.log(e));
    }

    handeCardRemoval(index, card_type) {
        this.setState({
            [card_type]: [...this.state[card_type].slice(0, index), ...this.state[card_type].slice(index+1)]
        }, () => this.areCardsValid())
    }

    componentDidMount() {
        this.areCardsValid();
    }


    render() {
			if (!this.props.userID) {
				return (
					<div className="DeckCreator-center">
							<p className="">Cannot view this page until you log in!</p>
					</div>)
			}
      return (
        <>
            <div className="DeckCreator-deck-name-container">
                <input  placeholder="Enter Deck Name" className="DeckCreator-deck-name-input DeckCreator-deck-name" contentEditable="true" type="text" value={this.state.deck_name} onChange={(event)=>this.handleDeckNameChange(event.target.value)} value={this.state.deck_name} />
            </div>
            <div className="DeckCreator-center">
                <button className = {"DeckCreator-submit-deck"+(!this.state.error_message ? "" : "-invalid")} 
                    onClick={!this.state.error_message ? ()=>this.submitDeck() : null}>
                    {!this.state.error_message ? "Submit!" : this.state.error_message}
                </button>
            </div>
            <div className="u-flex">
                <div className="u-flexColumn deck-subContainer">
                    
                    <span>
                    <img className="DeckCreator-plus" src={plus} onClick={()=>this.handleCardAddition('prompt_cards')} aria-describedby="yeet"/>
                    <span className="DeckCreator-plus-text">Add prompt cards</span>
                    </span>

                    {this.state.prompt_cards.map((content, id) => (
                        <EditableCard isValid={this.isCardValid(content.card)} key={content.id} text={content.card} 
                            type="prompt"
                            onDelete={()=>this.handeCardRemoval(id, 'prompt_cards')} 
                            onChange={(data)=>this.handleCardChange(data, id, 'prompt_cards')} />
                    ))}
                    {this.state.prompt_cards.length > 5 ? <span>
                    <img className="DeckCreator-plus" src={plus} onClick={()=>this.handleCardAddition('prompt_cards')} aria-describedby="yeet"/>
                    <span className="DeckCreator-plus-text">Add prompt cards</span>
                    </span> : null}

                    
                </div>
                <div className="u-flexColumn deck-subContainer">
                    <div>
                        <img className="DeckCreator-plus" src={plus} onClick={()=>this.handleCardAddition('response_cards')} />
                        <span className="DeckCreator-plus-text">Add response cards</span>
                    </div>
                    {this.state.response_cards.map((content, id) => (
                        <EditableCard isValid={this.isCardValid(content.card)} key={content.id} text={content.card} 
                            type="response"
                            onDelete={()=>this.handeCardRemoval(id, 'response_cards')} 
                            onChange={(data)=>this.handleCardChange(data, id, 'response_cards')} />
                    ))}
                    {this.state.response_cards.length > 5 ? 
                    <div>
                        <img className="DeckCreator-plus" src={plus} onClick={()=>this.handleCardAddition('response_cards')} />
                        <span className="DeckCreator-plus-text">Add response cards</span>
                    </div>
                    : null}
                    
                </div>
            </div>
        </>
      );
    }
  }
  
  export default DeckCreator;
import React, { Component } from "react";
import EditableCard from "../modules/EditableCard.js"
import GoogleLogin from "react-google-login";
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
        deck_name: "",
        prompt_cards: [], // Stored as a list of strings
        response_cards: [],
      }
    }

    handleDeckNameChange(event) {
        this.setState({
            deck_name: event.target.value
        })
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
        // Check to see if the deck name is unique. If so submit. If not, inform the user of this.
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
            {/*<button onClick={this.submitDeck}>SubmitDeck</button>*/}
        </>
      );
    }
  }
  
  export default DeckCreator;
import React, { Component } from 'react';
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
import './JoinGame.css';

class JoinGame extends Component{
  constructor(props){
    super(props);
    this.state = {
      gameCode: "",
      incorrectCode: false,
      displayError: false,
    }
  }

  componentDidMount(){

  }

  handleClick = () => {
    this.setState({
      displayError: true,
    })
  }

  handleChange = (e) => {
    this.setState({
      gameCode: e.target.value,
    });
    get("/api/getGameID", {id: e.target.value}).then((data) => {
      console.log(data.index)
      this.setState({
        incorrectCode: data.index===-1,
      });
    })
  }

  render(){
    return(
      <div className = "JoinGame-container">
        <div className = "JoinGame-window">
          <h1>Join Game</h1>
          <div>
            Game Code: <input type="text" onChange = {(event)=>this.handleChange(event)}></input>
            <p className = "JoinGame-error-message" hidden = {!this.state.displayError}>Please enter a valid game code.</p>
            {
              this.state.incorrectCode?
              <button 
                onClick = {this.handleClick} 
                className = {this.state.displayError?"JoinGame-join-button JoinGame-button-text" : "JoinGame-join-button JoinGame-button-text JoinGame-extra-margin"}
                style = {{display: this.state.gameCode.length === 0? 'none' : 'block'}}
              >
                Join Room
              </button>
              :
              <Link to = {"/play/" + this.state.gameCode} className = "JoinGame-button-text">
                <span className = {this.state.displayError?"JoinGame-join-button" : "JoinGame-join-button JoinGame-extra-margin"} style = {{display: this.state.gameCode.length === 0 ? 'none' : 'block'}}>Join Room</span>
              </Link>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default JoinGame;
import React, { Component } from 'react';
import { Link } from "@reach/router";
import './JoinGame.css';

class JoinGame extends Component{
  constructor(props){
    super(props);
    this.state = {
      gameCode: "",
    }
  }

  componentDidMount(){

  }

  handleClick = () => {

  }

  handleChange = (e) => {
    this.setState({
      gameCode: e.target.value,
    })
  }

  render(){
    return(
      <div className = "JoinGame-container">
        <div className = "JoinGame-window">
          <h1>Join Game</h1>
          <div>
            Game Code: <input type="text" onChange = {(event)=>this.handleChange(event)}></input>
            <Link to = {"/play/" + this.state.gameCode} className = "JoinGame-button-text">
              <span className = "JoinGame-join-button" style = {{display: this.state.gameCode.length === 0 ? 'none' : 'block'}}>Join Room</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default JoinGame;
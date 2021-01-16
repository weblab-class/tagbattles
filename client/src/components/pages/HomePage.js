import React, { Component } from "react";
import { Link } from "@reach/router";
import "./HomePage.css";


class HomePage extends Component {
  constructor(props) {
    super(props);

  }
  
  componentDidMount() {
    
  }

  render() { 
    return (
      <>
        <Link to="/newgame">
            <button>New Game</button>
        </Link>
        <button>Join Game</button>
      </>
    );
  }
}

export default HomePage;
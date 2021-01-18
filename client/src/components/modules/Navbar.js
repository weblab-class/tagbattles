import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Navbar.css";

/*
*
*/
class Navbar extends Component {
  constructor(props){
      super(props);
  }

  render(){
    return (
      <nav>
        <div className = "nav-logo">
          <Link to = "/" className = "NavBar-link">
            <img src = "" alt = "Logo"/>
          </Link>
        </div>
        <div className = "nav-links">
					<ul className = "nav-list">
						<li><Link to  ="/play" className = "NavBar-link">New Game</Link></li>
						<li><Link to = "/play/gameID" className = "NavBar-link">Join Game</Link></li>
            <li>{this.props.userId ? (
              <GoogleLogout
                clientId={this.props.GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
              />
              ) : (
              <GoogleLogin
                clientId={this.props.GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.props.handleLogin}
                onFailure={(err) => console.log(err)}
              />
            )}</li>
					</ul>
        </div>
      </nav>
    )
  }
}

export default Navbar;
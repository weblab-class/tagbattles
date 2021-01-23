import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import { get, post } from "../../utilities";
import "./Navbar.css";

const GOOGLE_CLIENT_ID = "640440795885-4do41cm5va1aumbs67c398b1m8m2574o.apps.googleusercontent.com";

/*
*
*/
class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameID: null,
    }
  }

  componentDidMount() {
   get("/api/newGameID").then(data => (this.setState({gameID: data.gameID}))).catch(error => console.error(error));
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
						<li><Link to  = {"/play/" + this.state.gameID} className = "NavBar-link">New Game</Link></li>
						<li><Link to = "/play/" className = "NavBar-link">Join Game</Link></li>
            {this.props.userId?<li><Link to = {`/profile/${this.props.userId}`} className = "NavBar-link">Profile</Link></li>:null}
            <li>{this.props.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
              />
              ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
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
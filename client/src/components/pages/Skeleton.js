import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import HomePage from "./HomePage.js";
import Navbar from "../modules/Navbar.js";
import "../../utilities.css";
import "./Skeleton.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "640440795885-4do41cm5va1aumbs67c398b1m8m2574o.apps.googleusercontent.com";

class Skeleton extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div className = "Skeleton-container">
          {/*{this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        <HomePage userID={this.props.userId} />*/}
        <h1 className = "Skeleton-title">#TagBattles</h1>
        <p className = "Skeleton-description">Imagine card games like Cards Against Humanity, Apples to Apples, Game of Phones, but all of them are in one website! Join #TagBattles, invite your friends, and #TagYourCards!</p>
        <p className  ="Skeleton-description">Sign in with your Google account and play today!</p>
      </div>
    );
  }
}

export default Skeleton;

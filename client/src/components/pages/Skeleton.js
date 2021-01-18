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
      <>
        <HomePage />
      </>
    );
  }
}

export default Skeleton;

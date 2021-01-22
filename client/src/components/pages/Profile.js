import React, { Component } from "react";
import './Profile.css';
import leftArrow from '../../public/left-arrow.svg';
import rightArrow from '../../public/right-arrow.svg';
import redBody from "../../public/redbody.svg";
import blackBody from "../../public/blackbody.svg";
import brownBody from "../../public/brownbody.svg";
import yellowBody from "../../public/yellowbody.svg";
import greenBody from "../../public/greenbody.svg";
import blueBody from "../../public/bluebody.svg";
import cyanBody from "../../public/cyanbody.svg";
import orangeBody from "../../public/orangebody.svg";
import whiteBody from "../../public/whitebody.svg";
import pinkBody from "../../public/pinkbody.svg";
import purpleBody from "../../public/purplebody.svg";
import whiteD from "../../public/crescent.svg";

const bodyColors = [redBody, blackBody, brownBody, blueBody, purpleBody, orangeBody, greenBody, yellowBody, pinkBody, whiteBody, cyanBody];


class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      changingBio: false,
      changingCard: false,
      bio: "",
      favoriteCard: "",
      hatID: 0,
      name: "",
      colorID: 0,
      mouthID: 0,
      decks: [],
    }
  }

  componentDidMount(){

  }

  onBioChange = (e) => {

  }

  render(){
    return(
      <div className = "Profile-container">
        <h1 className = "Profile-username">{this.props.playerID}</h1>
        <div className = "Profile-avatar-customizer">
          <div className = "Profile-toggle-container">
            <img src = {leftArrow} alt = "&lt;--" className = "Profile-avatar-arrow"/>
            <img src = {leftArrow} alt = "&lt;--" className = "Profile-avatar-arrow"/>
            <img src = {leftArrow} alt = "&lt;--" className = "Profile-avatar-arrow"/>
          </div>
          <div className = "Profile-avatar-container">
            <div className = "Profile-body">
              <img src = {blackBody} alt = "skin"/>
            </div>
            <div className = "Profile-hat">
              <img src = "" alt = "hat"/>
            </div>
            <div className = "Profile-mouth">
              <img src = {whiteD} alt = "mouth"/>
            </div>
          </div>
          <div className  ="Profile-toggle-container">
            <img src = {rightArrow} alt = "--&gt;" className = "Profile-avatar-arrow"/>
            <img src = {rightArrow} alt = "--&gt;" className = "Profile-avatar-arrow"/>
            <img src = {rightArrow} alt = "--&gt;" className = "Profile-avatar-arrow"/>
          </div>
        </div>
        <div className = "Profile-bio-container">
          <div className = "Profile-bio-icons">
            {
              this.state.changingBio ? 
                <>
                  <img src = "" alt = "close" className = "Profile-bio-icon"/>
                  <img src = "" alt = "confirm" className = "Profile-bio-icon"/>
                </>
              :
                <img src = "" alt = "edit" className = "Profile-bio-icon"/>
            }
          </div>
          <h2>Biography</h2>
          <div className = "Profile-bio-edit-box">
            {
              this.state.changingBio ? 
                <input className = "Profile-bio-text" type = "text" value = {this.state.bio} onChange = {this.onBioChange}></input>
              :
                <p className = "Profile-bio-text">{this.state.bio}</p>
            }
          </div>
        </div>
        <div className = "Profile-favorite-card-box">
          <h2>Favorite Card</h2>
          {
            this.state.favoriteCard?
              <DisplayCard type = {1} text = {this.state.favoriteCard}/>
            :
              <button className = "Profile-card-button">Add Favorite Card</button>
          }
        </div>
        {
          this.state.decks.length > 0 ? 
          <div className = "Profile-decks">
            <h2>Decks</h2>
            {
              this.state.decks.map((deck) => {

              })
            }
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default Profile;
import React, { Component } from "react";
import './Profile.css';

//Icons
import leftArrow from '../modules/icons/left-arrow.svg';
import rightArrow from '../modules/icons/right-arrow.svg';
import RightArrow from '../modules/icons/right-arrow.js';
import LeftArrow from '../modules/icons/left-arrow.js';

//Bodies
import redBody from "../../public/bodies/redbody.svg";
import blackBody from "../../public/bodies/blackbody.svg";
import brownBody from "../../public/bodies/brownbody.svg";
import yellowBody from "../../public/bodies/yellowbody.svg";
import greenBody from "../../public/bodies/greenbody.svg";
import blueBody from "../../public/bodies/bluebody.svg";
import cyanBody from "../../public/bodies/cyanbody.svg";
import orangeBody from "../../public/bodies/orangebody.svg";
import whiteBody from "../../public/bodies/whitebody.svg";
import pinkBody from "../../public/bodies/pinkbody.svg";
import purpleBody from "../../public/bodies/purplebody.svg";

//Mouths
import whiteD from "../../public/mouths/whiteD.svg";
import blackD from "../../public/mouths/blackD.svg";
import blackSad from "../../public/mouths/blackSad.svg";
import whiteSad from "../../public/mouths/whiteSad.svg";
import blackSmile from "../../public/mouths/blackSmile.svg";
import whiteSmile from "../../public/mouths/whiteSmile.svg";
import blackFrown from "../../public/mouths/blackFrown.svg";
import whiteFrown from "../../public/mouths/whiteFrown.svg";
import blackStraight from "../../public/mouths/blackStraight.svg";
import whiteStraight from "../../public/mouths/whiteStraight.svg";
import blackO from "../../public/mouths/blackO.svg";
import whiteO from "../../public/mouths/whiteO.svg";

//Eyes
import whiteCarot from '../../public/eyes/whitecarrot.svg';
import blackCarot from '../../public/eyes/blackcarrot.svg';
import whiteBalls from '../../public/eyes/whiteballs.svg';
import blackBalls from '../../public/eyes/blackballs.svg';
import blackX from '../../public/eyes/blackX.svg';
import whiteX from '../../public/eyes/whiteX.svg';
import blackClosed from '../../public/eyes/blackclosed.svg';
import whiteClosed from '../../public/eyes/whiteclosed.svg';

//Hats
import beanie from "../../public/hats/beanie.svg";
import blueCap from "../../public/hats/bluecap.svg";
import femaleHair from "../../public/hats/femalehair.svg";
import trim from "../../public/hats/trim.svg";
import redCap from "../../public/hats/redCap.svg";

const bodyColors = [redBody, blackBody, brownBody, blueBody, purpleBody, orangeBody, greenBody, yellowBody, pinkBody, whiteBody, cyanBody];
const whiteMouths = [whiteD, whiteSad,whiteSmile,whiteFrown,whiteStraight, whiteO];
const blackMouths = [blackD, blackSad, blackSmile, blackFrown, blackStraight, blackO];
const whiteEyes = [whiteCarot, whiteBalls, whiteX, whiteClosed];
const blackEyes = [blackCarot, blackBalls, blackX, blackClosed];
const hats = [beanie, blueCap, femaleHair, trim, redCap];

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      changingBio: false,
      changingCard: false,
      bio: "",
      favoriteCard: "",
      hatID: 0,
      eyeID: 0,
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

  toggleLeftHat = () => {
    const newHat = this.state.hatID-1<0 ? hats.length-1 : this.state.hatID-1;
    this.setState((prevState) => {
      return {
        hatID: newHat,
      }
    });
  }

  toggleLeftColor = () => {
    const newColor = this.state.colorID-1<0 ? bodyColors.length-1 : this.state.colorID-1;
    this.setState((prevState) => {
      return {
        colorID: newColor,
      }
    });
  }

  toggleLeftEye = () => {
    const newEye = this.state.eyeID-1<0 ? blackEyes.length-1 : this.state.eyeID-1;
    this.setState((prevState) => {
      return {
        eyeID: newEye,
      }
    });
  }

  toggleLeftMouth = () => {
    const newMouth = this.state.mouthID-1<0 ? blackMouths.length-1 : this.state.mouthID-1;
    this.setState((prevState) => {
      return {
        mouthID: newMouth,
      }
    });
  }

  toggleRightHat = ()=>{
    const newHat = (this.state.hatID+1)%hats.length;
    this.setState((prevState) => {
      return {
        hatID: newHat,
      }
    })
  }

  toggleRightColor = () => {
    const newColor = (this.state.colorID+1)%bodyColors.length;
    this.setState((prevState) => {
      return {
        colorID: newColor,
      }
    })
  }

  toggleRightEye = () => {
    const newEye = (this.state.eyeID+1)%blackEyes.length;
    this.setState((prevState) => {
      return {
        eyeID: newEye,
      }
    })
  }

  toggleRightMouth = () => {
    const newMouth = (this.state.mouthID+1)%blackMouths.length;
    this.setState((prevState) => {
      return {
        mouthID: newMouth,
      }
    })
  }

  render(){
    return(
      <div className = "Profile-container">
        <h1 className = "Profile-username">{this.props.playerID}</h1>
        <div className = "Profile-avatar-customizer">
          <div className = "Profile-toggle-container">
            <LeftArrow func = {this.toggleLeftHat}/>
            <LeftArrow func = {this.toggleLeftEye}/>
            <LeftArrow func = {this.toggleLeftMouth}/>
            <LeftArrow func = {this.toggleLeftColor}/>
          </div>
          <div className = "Profile-avatar-container">
            <div className = "Profile-body">
              <img src = {bodyColors[this.state.colorID]} alt = "skin" className = "Profile-avatar-part"/>
            </div>
            <div className = "Profile-hat">
              <img src = {hats[this.state.hatID]} alt = "hat" className = "Profile-avatar-part"/>
            </div>
            <div className = "Profile-mouth">
              <img src = {blackMouths[this.state.mouthID]} alt = "mouth" className = "Profile-avatar-part"/>
            </div>
            <div className = "Profile-eyes">
              <img src = {blackEyes[this.state.eyeID]} alt = "eyes" className = "Profile-avatar-part"/>
            </div>
          </div>
          <div className  ="Profile-toggle-container">
            <RightArrow func = {this.toggleRightHat}/>
            <RightArrow func = {this.toggleRightEye}/>
            <RightArrow func = {this.toggleRightMouth}/>
            <RightArrow func = {this.toggleRightColor}/>
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
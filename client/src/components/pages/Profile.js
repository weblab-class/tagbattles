import React, { Component } from "react";
import { get, post } from "../../utilities.js";
import './Profile.css';

//Icons
import leftArrow from '../modules/icons/left-arrow.svg';
import rightArrow from '../modules/icons/right-arrow.svg';
import RightArrow from '../modules/icons/right-arrow.js';
import LeftArrow from '../modules/icons/left-arrow.js';
import Avatar from '../modules/Avatar.js';

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
    get("/api/getPlayer", {userID: this.props.playerID}).then((data) => {
      console.log(data);
      this.setState({
        bio: data.bio,
        favoriteCard: data.favCard,
        hatID: data.hatID,
        eyeID: data.eyeID,
        name: data.name,
        colorID: data.colorID,
        mouthID: data.mouthID,
      });

    })
  }

  onBioChange = (e) => {

  }

  toggleLeftHat = () => {
    const newHat = this.state.hatID-1<0 ? hats.length-1 : this.state.hatID-1;
    post("/api/setPlayerHat", {userID: this.props.playerID, hatID: newHat}).then((data)=>{
      this.setState({
        hatID: data.hatID,
      });
    })
  }

  toggleLeftColor = () => {
    const newColor = this.state.colorID-1<0 ? bodyColors.length-1 : this.state.colorID-1;
    post("/api/setPlayerColor", {userID: this.props.playerID, colorID: newColor}).then((data)=>{
      this.setState({
        colorID: data.colorID,
      });
    })
  }

  toggleLeftEye = () => {
    const newEye = this.state.eyeID-1<0 ? blackEyes.length-1 : this.state.eyeID-1;
    post("/api/setPlayerEye", {userID: this.props.playerID, eyeID: newEye}).then((data)=>{
      this.setState({
        eyeID: data.eyeID,
      });
    })
  }

  toggleLeftMouth = () => {
    const newMouth = this.state.mouthID-1<0 ? blackMouths.length-1 : this.state.mouthID-1;
    post("/api/setPlayerMouth", {userID: this.props.playerID, mouthID: newMouth}).then((data)=>{
      this.setState({
        mouthID: data.mouthID,
      });
    })
  }

  toggleRightHat = ()=>{
    const newHat = (this.state.hatID+1)%hats.length;
    post("/api/setPlayerHat", {userID: this.props.playerID, hatID: newHat}).then((data)=>{
      this.setState({
        hatID: data.hatID,
      });
    })
  }

  toggleRightColor = () => {
    const newColor = (this.state.colorID+1)%bodyColors.length;
    post("/api/setPlayerColor", {userID: this.props.playerID, colorID: newColor}).then((data)=>{
      this.setState({
        colorID: data.colorID,
      });
    })
  }

  toggleRightEye = () => {
    const newEye = (this.state.eyeID+1)%blackEyes.length;
    post("/api/setPlayerEye", {userID: this.props.playerID, eyeID: newEye}).then((data)=>{
      this.setState({
        eyeID: data.eyeID,
      });
    })
  }

  toggleRightMouth = () => {
    const newMouth = (this.state.mouthID+1)%blackMouths.length;
    post("/api/setPlayerMouth", {userID: this.props.playerID, mouthID: newMouth}).then((data)=>{
      this.setState({
        mouthID: data.mouthID,
      });
    })
  }

  render(){
    return(
      <div className = "Profile-container">
        <h1 className = "Profile-username">{this.state.name}</h1>
        <div className = "Profile-avatar-customizer">
          <div className = "Profile-toggle-container">
            <LeftArrow func = {this.toggleLeftHat}/>
            <LeftArrow func = {this.toggleLeftEye}/>
            <LeftArrow func = {this.toggleLeftMouth}/>
            <LeftArrow func = {this.toggleLeftColor}/>
          </div>
          <Avatar
            colorID = {this.state.colorID}
            width = {"200px"}
            height = {"200px"}
            mouthID = {this.state.mouthID}
            hatID = {this.state.hatID}
            eyeID = {this.state.eyeID}
          />
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
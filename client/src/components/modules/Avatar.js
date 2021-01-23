import React, { Component } from 'react';
import './Avatar.css';

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

/**
 * props
 * @param {String} width
 * @param {String} height
 * @param {Number} colorID
 * @param {Number} hatID
 * @param {Number} mouthID
 * @param {Number} eyeID
 */
class Avatar extends Component { 
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount(){

  }

  render(){
    return(
      <div className = "Avatar-avatar-container" style = {{"height": this.props.height, "width": this.props.width}}>
        <div className = "Avatar-body" style = {{"height": this.props.height, "width": this.props.width}}>
          <img src = {bodyColors[this.props.colorID]} alt = "skin" className = "Avatar-avatar-part"/>
        </div>
        <div className = "Avatar-hat" style = {{"height": this.props.height, "width": this.props.width}}>
          <img src = {hats[this.props.hatID]} alt = "hat" className = "Avatar-avatar-part"/>
        </div>
        <div className = "Avatar-mouth" style = {{"height": this.props.height, "width": this.props.width}}>
          <img src = {blackMouths[this.props.mouthID]} alt = "mouth" className = "Avatar-avatar-part"/>
        </div>
        <div className = "Avatar-eyes" style = {{"height": this.props.height, "width": this.props.width}}>
          <img src = {blackEyes[this.props.eyeID]} alt = "eyes" className = "Avatar-avatar-part"/>
        </div>
      </div>
    )
  }
}

export default Avatar;
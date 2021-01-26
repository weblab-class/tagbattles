import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import HamburgerIcon from './icons/hamburger.js';
import Logo from './icons/logo.js';
import CloseButton from './icons/close.js';
import "./Navbar.css";

const GOOGLE_CLIENT_ID = "640440795885-4do41cm5va1aumbs67c398b1m8m2574o.apps.googleusercontent.com";

/** 
*Props:
*@param {String} gameID
*@param {Function} setNewGameID
*/
class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      listClosed: true,
    }
  }

  componentDidMount(){
    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 800){
        this.setState({
          listClosed:true,
        })
      }
    })
  }

  openNav = () => {
    this.setState((prevState) => {
      return {
        listClosed: !prevState.listClosed,
      }
    })
  }

  closeNav = () => {
    this.setState({
      listClosed: true,
    })
  }

  render(){
    return (
      <nav>
        <div className = "NavBar-nav-logo">
          <Link to = "/" className = "NavBar-link">
            <Logo/>
          </Link>
        </div>
        <div className = "NavBar-hamburger">
          {this.state.listClosed ?
            <HamburgerIcon func = {this.openNav}/>
          :
            <CloseButton func = {this.openNav} location = "nav"/>
          }
        </div>
        <div className = {this.state.listClosed ? "NavBar-nav-links-closed NavBar-smooth" : "NavBar-smooth NavBar-nav-links"}>
					<ul className = "NavBar-nav-list">
						<li className = "NavBar-nav-item"><Link to  = {"/play/" + this.props.gameID} className = "NavBar-link" onClick = {()=>{this.closeNav();this.props.setNewGameID();}}>New Game</Link></li>
						<li className = "NavBar-nav-item"><Link to = "/play/" className = "NavBar-link" onClick = {this.closeNav}>Join Game</Link></li>
            <li className = "NavBar-nav-item"><Link to  = {"/create"} className = "NavBar-link" onClick = {this.closeNav}>Create Deck</Link></li>
            {this.props.userId?<li className = "NavBar-nav-item"><Link to = {`/profile/${this.props.userId}`} className = "NavBar-link" onClick = {this.closeNav}>Profile</Link></li>:null}
            <li className = "NavBar-nav-item-google">{this.props.userId ? (
              <GoogleLogout
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={this.props.handleLogout}
                onFailure={(err) => console.log(err)}
                onClick = {this.closeNav}
              />
              ) : (
              <GoogleLogin
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={(res)=>{this.closeNav();this.props.handleLogin(res)}}
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
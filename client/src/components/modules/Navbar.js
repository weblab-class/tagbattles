import React, { Component } from "react";
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
                {this.props.userId ? (
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
                )}
                <div>
                    
                </div>
            </nav>
        )
    }
}

export default Navbar;
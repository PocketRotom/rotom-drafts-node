import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
//import '../login.css';


class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'message': undefined,
        }

        this.makeSignUp = this.makeSignUp.bind(this);
    };


    async makeSignUp(e) {
        e.preventDefault();
        let username = document.querySelector("#usernameInput").value;
        let password = document.querySelector("#passwordInput").value;
        let email = document.querySelector("#emailInput").value;
        let discord = document.querySelector("#discordInput").value;

        let json = JSON.stringify({ username: username, password: password, email: email, discord: discord });

        await axios.post(`${sessionStorage.getItem("apiURL")}/auth/signup`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: response.data.error })
            } else {
                this.setState({ message: "Signed Up Successfully" });
                window.location.href = "/login";
            }
        });
    }


    render() {
        if (sessionStorage.getItem("userData") != null) {
            window.location.href = "/";
            return;
        }

        var style = document.createElement('style');
        style.innerHTML = `html,
        body {
          height: 100%;
        }
        
        body {
          padding-top: 40px;
          padding-bottom: 40px;
          background-color: #f5f5f5;
        }
        
        .form-signin {
          width: 100%;
          max-width: 330px;
          padding: 15px;
          margin: auto;
        }
        
        .form-signin .checkbox {
          font-weight: 400;
        }
        
        .form-signin .form-floating:focus-within {
          z-index: 2;
        }
        
        .form-signin input[type="text"] {
          margin-bottom: -1px;
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
        
        .form-signin input[type="password"] {
          margin-bottom: 10px;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }`;

        document.querySelector("head").appendChild(style);

        let messageHTML = [];
        if (this.state.message != undefined) {
            if (this.state.message == "Signed Up Successfully") {
                messageHTML.push(
                    <div class="alert alert-success">
                        {this.state.message}
                    </div>
                );
            } else {
                messageHTML.push(
                    <div class="alert alert-danger">
                        {this.state.message}
                    </div>
                );
            }

        }
        return (
            <main className="form-signin">
                <form method="post" onSubmit={this.makeSignUp}>

                    {messageHTML}

                    <div className="form-floating">
                        <input type="text" className="form-control" id="usernameInput" placeholder="username" name="username" required autoFocus />
                        <label htmlFor="usernameInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="emailInput" placeholder="Email Address" name="email" required />
                        <label htmlFor="emailInput">Email Address</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" id="discordInput" placeholder="Discord Tag" name="discord" />
                        <label htmlFor="discordInput">Discord Tag</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="passwordInput" placeholder="Password" name="password" required />
                        <label htmlFor="passwordInput">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <a href="signup">Sign Up</a> <br />
                    <a href="/">Go Back</a>
                </form>
            </main>)
    }
}

export default Signup;
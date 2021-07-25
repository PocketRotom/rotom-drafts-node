import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkIfLeagueExists from "../utils/checkIfLeagueExists";
import checkIfUserHasLogin from '../utils/checkIfUserHasLogin';

class register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'isLoaded': false,
            'exists': true,
            'alreadySignedUp': false,
            'message': undefined,
            'user': undefined
        }

        this.makeSignUp = this.makeSignUp.bind(this);
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.checkLeagueExists(id);
        this.checkIfUserSignedUp(id);
    }

    async checkLeagueExists(id) {

        let exists = await checkIfLeagueExists(id);
        if (!exists) {
            this.setState({ 'exists': exists });
        }
    }

    async checkIfUserSignedUp(id) {

        let user = await checkIfUserHasLogin();

        user = JSON.parse(user);

        let userID = user.userID;

        let json = JSON.stringify({ userID: userID });

        await axios.post(`${sessionStorage.getItem("apiURL")}/leagues/${id}/alreadySignedUp`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.data[0] != undefined) {
                this.setState({ message: "You're already signed up. Go back to the League Page" });
            };
            this.setState({ isLoaded: true, user: user });
        });

    }

    async makeSignUp(e){
        e.preventDefault();

        let teamName = document.querySelector("#name").value;
        let leagueID = this.props.match.params.id;
        let userID = this.state.user.userID;

        let json = JSON.stringify({ teamName: teamName, userID: userID});

        let newTeam;

        await axios.post(`${sessionStorage.getItem("apiURL")}/leagues/${leagueID}/teams/signup`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: response.data.error + ". This means you're still not signed up" })
            } else {
                newTeam = response.data.data;
            }
        });


        let form_data = new FormData();
        form_data.append('id', newTeam );
        form_data.append('file', document.querySelector('#logo').files[0]);

        await axios.post(`${sessionStorage.getItem("apiURL")}/upload/teams`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: "Error uploading the image, but you're still signed up!" })
            } else {
                this.setState({ message: "Signed Up Successfully. You can go back" });
            }
        });

    }


    render() {


        if (this.state.isLoaded == false) {
            return <div>Loading Signup Form</div>
        } else {

            if (this.state.message != undefined) {
                return (
                    <div className="alert alert-info">
                        {this.state.message}
                    </div>
                );
            }
        }
        return (
            <div className="container mt-5">
                <form method="post" encType="multipart/form-data" onSubmit={this.makeSignUp}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Team Name</label>
                        <input type="text" name="name" className="form-control" id="name" required autoFocus defaultValue="" maxLength="45" />
                    </div>
                    <div>
                        <label htmlFor="logo" className="form-label">Team Logo (In PNG Format)</label><br />
                        <input type="file" id="logo" name="logo" accept=".png" required />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>)
    }
}

export default withRouter(register);
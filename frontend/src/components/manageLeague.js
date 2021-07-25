import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkToken from '../utils/checkToken';

class ManageLeague extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'message': undefined,
            'user': undefined,
            'exists': true,
            'isLoaded': false,
            'leagueID': undefined,
            'nonAdmins': []

        }

        this.updateLeague = this.updateLeague.bind(this);
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({leagueID: id});

        this.checkIfAdmin();

        this.getNonAdmins();
    }

    async checkIfAdmin() {
        let loggedIn = await checkToken();
        if (loggedIn) {
            let userData = JSON.parse(sessionStorage.getItem("userData"));

            let admins;

            let isAdmin;

            await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${this.props.match.params.id}/admins`).then((response) => {
                admins = response.data.data;
            });

            admins.forEach(admin => {
                if (admin.idUser == userData.userID) {
                    isAdmin = true;
                }
            });

            if (isAdmin == false) {
                window.location.href = "/";
            }
        }
    }


    async updateLeague(e) {
        e.preventDefault();

        let leagueName = document.querySelector("#name").value;
        let newAdmin = document.querySelector("#users").value;
        let signups = document.querySelector('input[name="signups"]:checked').value

        let leagueID = this.state.leagueID;

        if (signups == "yes") {
            signups = 1;
        } else {
            signups = 0;
        }

        let json;
        if (newAdmin == "non") {
            json = JSON.stringify({ name: leagueName, signups: signups});
        } else {
            json = JSON.stringify({ name: leagueName, admin: newAdmin, signups: signups});
        }

        await axios.put(`${sessionStorage.getItem("apiURL")}/leagues/${leagueID}/update`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: response.data.error + ". This means the league is still unupdated" })
            } else {
                this.setState({message: "League updated successfully"});
            }
        });

    }

    async getNonAdmins(){

        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${this.state.leagueID}/nonAdmins`).then((response) => {
            this.setState({nonAdmins: response.data.data, isLoaded: true});
        })
    }


    render() {
        let message = [];
        if (this.state.isLoaded == false) {
            return <div>Loading Manage Form</div>
        } else {

            if (this.state.message != undefined) {
                message.push((
                    <div className="alert alert-info">
                        {this.state.message}
                    </div>
                ));
            }
        }
        let nonAdmins = [];
        this.state.nonAdmins.forEach(nonAdmin => {
            nonAdmins.push((<option key={nonAdmin.userID} value={nonAdmin.userID}>{nonAdmin.username}</option>))
        });
        return (
            <div className="container mt-5">
                
                {message}
                <form method="post" encType="multipart/form-data" onSubmit={this.updateLeague}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">League Name</label>
                        <input type="text" name="name" className="form-control" id="name" autoFocus defaultValue="" />
                    </div>
                    <label htmlFor="signups" className="form-label">Sign Ups Open?</label><br />
                    <input type="radio" id="no" name="signups" value="no" required /><label htmlFor="no">No</label>
                    <input type="radio" id="yes" name="signups" value="yes" /><label htmlFor="yes">Yes</label>
                    <br />
                    <label htmlFor="users">Add new user as Admin:</label>

                    <select name="users" id="users">
                        <option value="non">No new Admin</option>
                        {nonAdmins}
                    </select>
                    <div className="alert alert-danger" role="alert">
                        (Warning: This is permanent and they will have the same permissions as you)
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>)
    }
}

export default withRouter(ManageLeague);
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkToken from '../utils/checkToken';

class AddMatch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'message': undefined,
            'user': undefined,
            'exists': true,
            'isLoaded': false,
            'leagueID': undefined,
            'teams' : []

        }

        this.createMatch = this.createMatch.bind(this);
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ leagueID: id });
        this.checkIfAdmin();
        this.getTeams();
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


    async createMatch(e) {
        e.preventDefault();

        let team1 = document.querySelector("#team1").value;
        let team2 = document.querySelector("#team2").value;
        let week = document.querySelector("#week").value;
        let stream = document.querySelector('input[name="stream"]:checked').value;
        
        if (stream == "yes") {
            stream = 1;
        } else {
            stream = 0;
        }

        let json = JSON.stringify({ team1: team1, team2: team2, week: week, stream: stream });
        

        await axios.post(`${sessionStorage.getItem("apiURL")}/leagues/${this.props.match.params.id}/matches`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: response.data.error + ". Thiss means the game still doesn't exist" })
            } else {
                this.setState({ message: "Game added successfully" });
            }
        });

    }

    async getTeams() {
        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${this.props.match.params.id}/teams`).then((response) => {
            this.setState({ teams: response.data.data, isLoaded: true });
        });
    }

    getTeamsHTML(){
        let html = [];
        this.state.teams.forEach(team => {
            
            html.push((
                <option value={team.idTeam}>{team.teamName}</option>
            ))
        });

        return html;
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
        let teams = this.getTeamsHTML();
        return (
            <div className="container mt-5">

                {message}
                <form method="post" encType="multipart/form-data" onSubmit={this.createMatch}>
                    <label htmlFor="team1" className="form-label">Team 1</label>
                    <select name="team1" id="team1">
                        {teams}
                    </select> <br />
                    <h1>VS</h1>
                    <label htmlFor="team2" className="form-label">Team 2</label>
                    <select name="team2" id="team2">
                        {teams}
                    </select>
                    <label htmlFor="week" className="form-label">Week: </label>
                    <input type="number" id="week" name="week" min="1" max="50" defaultValue="1" /> <br />
                    <label htmlFor="stream" className="form-label">Is the match going to be featured on stream? </label>
                    <input type="radio" id="no" name="stream" value="no" required defaultChecked /><label htmlFor="no">No</label>
                    <input type="radio" id="yes" name="stream" value="yes" /><label htmlFor="yes">Yes</label> <br />

                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>)
    }
}

export default withRouter(AddMatch);
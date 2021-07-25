import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkToken from '../utils/checkToken';

class SubmitResult extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'message': undefined,
            'user': undefined,
            'exists': true,
            'isLoaded': false,
            'leagueID': undefined,
            'match': undefined

        }

        this.submitResult = this.submitResult.bind(this);
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ leagueID: id });
        this.checkIfAdmin();
        this.getMatch();
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


    async submitResult(e) {
        e.preventDefault();

        let team1 = document.querySelector("#team1Score").value;
        let team2 = document.querySelector("#team2Score").value;
        let replay = document.querySelector("#replay").value;

        if (replay == "") {
            replay = null;
        }

        let json = JSON.stringify({ scoreT1: team1, scoreT2: team2, replay: replay });


        await axios.put(`${sessionStorage.getItem("apiURL")}/leagues/none/matches/${this.props.match.params.id}`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: response.data.error + ". This game wasn't updated" })
            } else {
                this.setState({ message: "Game added successfully" });
            }
        });

    }

    async getMatch() {
        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/none/matches/${this.props.match.params.id}`).then((response) => {
            this.setState({ match: response.data.data[0], isLoaded: true });
        });
    }


    render() {
        let message = [];
        if (this.state.isLoaded == false) {
            return <div>Loading</div>
        } else {

            if (this.state.message != undefined) {
                message.push((
                    <div className="alert alert-info">
                        {this.state.message}
                    </div>
                ));
            }
        }
        return (
            <div className="container mt-5">

                {message}
                <form method="post" encType="multipart/form-data" onSubmit={this.submitResult}>
                    <label htmlFor="team1Score" className="form-label">Score for {this.state.match.team1Name} (Required) </label>
                    <input type="number" name="team1Score" className="form-control" id="team1Score" required autoFocus defaultValue="0" min="0" max="6" />

                    <label htmlFor="team2Score" className="form-label">Score for {this.state.match.team2Name} (Required) </label>
                    <input type="number" name="team2Score" className="form-control" id="team2Score" required defaultValue="0" min="0" max="6" />

                    <label htmlFor="replay" className="form-label">Replay Link </label>
                    <input type="url" name="replay" className="form-control" id="replay" />

                    <br />
                    <div className="alert alert-danger" role="alert">
                        (Warning: This is considered final!)
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>)
    }
}

export default withRouter(SubmitResult);
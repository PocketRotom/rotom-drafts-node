import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import checkToken from "../utils/checkToken";


class Team extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'team': {},
            'teamDraft': [],
            'isLoaded': false,
            'exists': true,
            'admin': false
        }
    };

    

    componentDidMount() {
        const id = this.props.match.params.idTeam;
        this.getTeam(id);
        this.checkIfAdmin();
    }


    async getTeam(id) {
        let team;

        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/32/teams/${id}`).then((response) => {
            team = response.data.data[0];
        })

        let teamDraft;

        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/32/teams/${id}/draft`).then((response) => {
            teamDraft = response.data.data;
        })

        this.setState({team: team});
        this.setState({teamDraft: teamDraft});
    }


    async checkIfAdmin() {
        let loggedIn = await checkToken();
        if (loggedIn) {
            let userData = JSON.parse(sessionStorage.getItem("userData"));

            let admins;

            await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${this.props.match.params.id}/admins`).then((response) => {
                admins = response.data.data;
            });

            admins.forEach(admin => {
                if (admin.idUser == userData.userID) {
                    this.setState({ admin: true });
                }
            });
        }


    }

    getPokemonHTML() {
        let pokemonHTML = [];
        this.state.teamDraft.forEach((pokemon, index) => {
            pokemonHTML.push( (
                <img src={sessionStorage.getItem("apiURL") + "/public/images/pokemon/" + pokemon.idPokemon + ".png"} className="img-fluid" width="70"></img>
            ))
        })
        return pokemonHTML;
    }

    getDivisionsHTML() {
        let divisionsHTML = [];
        this.state.divisions.forEach((division, indexDivision) => {
            let teamsHTML = [];
            if (division.teams.length == 0) {
                teamsHTML = (
                    <tr>
                        <th>This Division has no Players</th>
                    </tr>
                );
            } else {
                division.teams.forEach((team, indexTeam) => {
                    teamsHTML.push( (
                        <tr key={indexTeam}>
                            <td>{indexTeam + 1}</td>
                            <td>{team.teamName}</td>
                            <td><img src={sessionStorage.getItem("apiURL") + "/public/images/teams/" + team.idTeam + ".png"} className="img-fluid" width="70"></img></td>
                            <td>{team.wins}</td>
                            <td>{team.losses}</td>
                            <td>{team.differential}</td>
                            <td>{team.streak}</td>
                            <td>{team.points}</td>
                        </tr>
                    ));
                });
            }
            divisionsHTML.push((
                <div key={indexDivision} className="container mt-4">
                    <h1 style={{ textAlign: "center" }}>{division.name}</h1>
                    <table className="table table-image">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Name</th>
                                <th>Logo</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Differential</th>
                                <th>Streak</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamsHTML}
                        </tbody>
                    </table>
                </div>
            ));
        });
        return divisionsHTML;
    }



    render() {
        console.log(this.state.team);
        //debugger;
        return (
            <div><h1>{this.state.team.teamName}</h1>
            <div><h2>Pokémon Team</h2>
                {this.getPokemonHTML()}</div>
            </div>
        )
        let leagues;
        if (!this.state.exists) {
            return <div><h1 style={{ textAlign: "center" }}>This League doesn't exists</h1></div>
        }
        if (this.state.isLoaded == false) {
            return <div>Loading</div>;
        } else {
            if (this.state.divisions.length < 1) {
                if (this.state.admin) {
                    leagues = (
                        <div><h1 style={{ textAlign: "center" }}>This League has no Divisions</h1>
                            <h2 style={{ textAlign: "center" }}>You can add one <a href="/division/add">here</a></h2></div>);
                } else {
                    leagues = (
                        <div><h1 style={{ textAlign: "center" }}>This League has no Divisions</h1></div>);
                }
                
            } else {
                leagues = this.getDivisionsHTML();
            }

            return leagues;
        }

    }
}

export default withRouter(Team);
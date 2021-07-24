import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import checkIfLeagueExists from "../utils/checkIfLeagueExists";


class League extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'divisions': [],
            'isLoaded': false,
            'exists': true
        }
    };

    

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getDivisions(id);
    }

    async getDivisions(id) {
        
        let exists = await checkIfLeagueExists(id);
        if (!exists) {
            this.setState({'exists': exists});
            return false;
        }
        let divisions;

        await axios.get(`http://localhost:3001/leagues/${id}/divisions`).then((response) => {
            divisions = response.data.data;
        })

        this.getTeams(id, divisions);

    }

    

    async getTeams(id, divisions) {
        let divisionsBak = divisions;
        let iDs = [];
        divisions.forEach((division, index) => {
;
            iDs.push(this.getTeamsByDivision(id, division.idDivision, index, divisionsBak))
        });
        await Promise.all(iDs);
        this.setState({ 'divisions': divisionsBak, 'isLoaded': true });
    }

    

    async getTeamsByDivision(leagueID, divisionID, index, divisions) {
        await axios.get(`http://localhost:3001/leagues/${leagueID}/divisions/${divisionID}`).then((response) => {
            divisions[index].teams = response.data.data;
        });
        return divisions;
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
                            <td><img src={"/images/teams/" + team.idTeam + ".png"} className="img-fluid" width="70"></img></td>
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
        let leagues;
        if (!this.state.exists) {
            return <div><h1 style={{ textAlign: "center" }}>This League doesn't exists</h1></div>
        }
        if (this.state.isLoaded == false) {
            return <div>Loading</div>;
        } else {
            if (this.state.divisions.length < 1) {
                leagues = (
                    <div><h1 style={{ textAlign: "center" }}>This League has no Divisions</h1>
                        <h2 style={{ textAlign: "center" }}>You can add one <a href="/division/add">here</a></h2></div>);
            } else {
                leagues = this.getDivisionsHTML();
            }

            return leagues;
        }

    }
}

export default withRouter(League);
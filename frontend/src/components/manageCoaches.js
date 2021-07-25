import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkIfLeagueExists from "../utils/checkIfLeagueExists";
import orderBy from "../utils/orderBy";


class ManageCoaches extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'divisions': [],
            'teamsWithDivisions': [],
            'teamsWithNoDivisions': [],
            'isLoaded': false,
            'exists': true
        }
    };



    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.getDivisions(id);
        await this.getTeamsWithDivisions(id);
        await this.getTeamsWithNoDivision(id);
    }

    async getDivisions(id) {
        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${id}/divisions`).then((response) => {
            this.setState({ 'divisions': response.data.data });
        });
    }

    async getTeamsWithDivisions(id) {
        let divisionsBak = this.state.divisions;
        let iDs = [];
        this.state.divisions.forEach((division, index) => {
;
            iDs.push(this.getTeamsByDivision(id, division.idDivision, index, divisionsBak))
        });
        await Promise.all(iDs);
        let teamsWithDivisions = [];
        divisionsBak.forEach(division => {
            teamsWithDivisions.push(division.teams);
        });
        this.setState({ 'teamsWithDivisions': teamsWithDivisions });
    }

    
    async getTeamsByDivision(leagueID, divisionID, index, divisions) {
        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${leagueID}/divisions/${divisionID}`).then((response) => {
            divisions[index].teams = response.data.data;
        });
        return divisions;
    }

    async getTeamsWithNoDivision(id) {
        let teams;
        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${id}/divisions/noDivision`).then((response) => {
            teams = response.data.data;
        });
        this.setState({ 'teamsWithNoDivisions': teams, 'isLoaded' : true });
    }


    getHTMLTeamsWithDivisions() {
        let html = [];
        this.state.teamsWithDivisions.forEach(division => {
            let divisions = [];
            division.forEach(team => {
                let teams = [];
                this.state.teamsWithDivisions.forEach(division2 => {
                    let isChecked = division2.idDivision == team.idDivision;
                    teams.push((
                        <div key={division2.idDivision + team.idTeam}>
                            <label htmlFor={"division[" + team.idTeam + "]"} className="form-label">{division2.name}</label>
                            <input type="radio" id={"division" + team.idTeam} name={"division[" + team.idTeam + "]"} defaultValue={division2.idDivision} required {...isChecked && "checked"} />
                        </div>
                    ));
                });
                divisions.push((
                    <tr key={team.idTeam}>
                        <th scope="row"> {team.teamName} </th>
                        <td>
                            {teams}
                        </td>
                    </tr>
                ));
            });
            html.push((
                <div className="col" key={division.idDivision}>
                    <h1 style={{ textAlign: "center" }} key={division.idDivision}> {division.name} </h1>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Team Name</th>
                                <th scope="col">Division</th>
                            </tr>
                        </thead>
                        <tbody>
                            {divisions}
                        </tbody>
                    </table>
                </div>
            ))
        });
        return html;
    }

    getHTMLTeamsWithNoDivisions() {
        let html = [];
        if (this.state.teamsWithNoDivisions != undefined) {
            let divisions = [];
            this.state.teamsWithNoDivisions.forEach(team => {
                let teams = [];
                this.state.divisions.forEach(division2 => {
                    let isChecked = division2.idDivision == team.idDivision;
                    teams.push((
                        <div key={division2.idDivision + team.idTeam}>
                            <label htmlFor={"division[" + team.idTeam + "]"} className="form-label">{division2.name}</label>
                            <input type="radio" id={"division" + team.idTeam} name={"division[" + team.idTeam + "]"} defaultValue={division2.idDivision} required {...isChecked && "checked"} />
                        </div>
                    ));
                });
                divisions.push((
                    <tr key={team.idTeam}>
                        <th scope="row"> {team.teamName} </th>
                        <td>
                            {teams}
                        </td>
                    </tr>
                ));
            });
            html.push((
                <div className="col" key={false}>
                    <h1 style={{ textAlign: "center" }} key={false}> Teams With No Division </h1>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Team Name</th>
                                <th scope="col">Division</th>
                            </tr>
                        </thead>
                        <tbody>
                            {divisions}
                        </tbody>
                    </table>
                </div>
            ))

            return html;
        } else {
            return <div></div>
        }
    }

    render() {
        if (!this.state.exists) {
            return <div><h1 style={{ textAlign: "center" }}>This League doesn't exists</h1></div>
        }
        if (this.state.isLoaded == false) {
            return <div>Loading</div>;
        } else { 
            let teamsWithDivisions = this.getHTMLTeamsWithDivisions();
            let teamsWithNoDivisions = this.getHTMLTeamsWithNoDivisions();

            return ((
                <div className="container-fluid">
                    <form method="post" encType="multipart/form-data">
                        <div className="row row-cols-3">

                            {teamsWithDivisions}
                            {teamsWithNoDivisions}


                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            ));
        }

    }
}

export default withRouter(ManageCoaches);
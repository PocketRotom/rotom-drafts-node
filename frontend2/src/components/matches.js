import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkIfLeagueExists from "../utils/checkIfLeagueExists";
import orderBy from "../utils/orderBy";


class Matches extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'matches': [],
            'isLoaded': false,
            'exists': true
        }
    };



    componentDidMount() {
        const id = this.props.match.params.id;
        this.getMatches(id);
    }

    async getMatches(id) {

        let exists = await checkIfLeagueExists(id);
        if (!exists) {
            this.setState({ 'exists': exists });
            return false;
        }
        let matches;

        await axios.get(`http://localhost:3001/leagues/${id}/matches`).then((response) => {
            matches = response.data.data;
        })

        this.orderMatches(matches);

    }



    async orderMatches(matches) {
        matches = orderBy(matches, 'week');
        matches = Object.entries(matches);
        this.setState({ 'matches': matches, 'isLoaded': true });
    }

    getHTMLofWeek() {
        let html = [];
        this.state.matches.forEach(week => {
            html.push(<h2 className="text-center mt-2" key={week[1][0].week}>Week {week[1][0].week} </h2>);
            week[1].forEach(match => {
                let winner;
                let replay;
                let played;
                let stream;
                let score;
                if (match.scoreTeam1 != null) {
                    if (match.scoreTeam1 > match.scoreTeam2) {
                        winner = "Winner: " + match.team1Name;
                        score = "Score: " + match.scoreTeam1 + " - " + match.scoreTeam2;
                    } else if (match.scoreTeam2 > match.scoreTeam1) {
                        winner = "Winner :" + match.team2Name;
                        score = "Score: " + match.scoreTeam2 + " - " + match.scoreTeam1;
                    } else {
                        winner = "Winner: Tie";
                        score = "Score: " + match.scoreTeam1 + " - " + match.scoreTeam2;
                    }
                    if (match.replay != null) {
                        replay = (<a target="_blank" href={match.replay}>View Replay</a>);
                    } else {
                        replay = "Unavailable";
                    }
                    played = (
                        <div className="card-footer text-muted">
                            {winner} <br />
                            {score}<br />
                            Replay: {replay}
                        </div>
                    );

                } else {
                    played = (
                        <div className="card-footer text-muted">
                            <a className="btn btn-primary" href={"/league/submitresult?matchID=" + match.idMatch}>Submit Score</a>
                        </div>
                    );
                }
                if (match.stream == 1) {
                    stream = (
                        <div className="card-footer text-muted">
                            This Match is going to be featured on stream
                        </div>
                    )
                }


                html.push((
                    <div className="card text-center mt-5" key={match.idMatch}>
                        <div className="card-header">
                            {match.team1Name} vs {match.team1Name}
                        </div>
                        <div className="card-body">
                            <p className="card-text"><img src={"/images/teams/" + match.idTeam1 + ".png"} className="img-fluid" width="50" /> VS <img src={"/images/teams/" + match.idTeam2 + ".png"} className="img-fluid" width="50" /></p>
                        </div>
                        {played}
                        {stream}
                    </div>
                ));
            });
        });
        return html;
    }


    render() {
        let matches;
        if (!this.state.exists) {
            return <div><h1 style={{ textAlign: "center" }}>This League doesn't exists</h1></div>
        }
        if (this.state.isLoaded == false) {
            return <div>Loading</div>;
        } else {
            matches = this.getHTMLofWeek();
            return (<div className="container">{matches}</div>);
        }

    }
}

export default withRouter(Matches);
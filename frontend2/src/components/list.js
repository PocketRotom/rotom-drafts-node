import React from "react";
import axios from "axios";


class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'leagues': [],
        }
    };

    componentDidMount(){
        this.getLeagues();
    }



    getLeagues() {
        axios.get('http://localhost:3001/leagues/').then((response) => {
            response.data.data.forEach(league => {
                if (league.playersCount == null) {
                    league.playersCount = 0;
                }
            });
            this.setState({ 'leagues': response.data.data });
        });

    }

    getHTML(leagues) {
        let leaguesHTML = [];
        leagues.forEach(league => {
            let format = "Singles"
            if (league.doublesSingles == 2) {
                format = "Doubles";
            }
            let signUpsOpen = 'Signups Closed'
            if (league.signUpsOpen == 1) {
                signUpsOpen = <a href={"/league/signup?leagueId=" + league.idLeague}>Register</a>;
            }
            leaguesHTML.push((
                <tr key={league.idLeague}><td><a href={"/league/" + league.idLeague}>{league.name}</a></td>
                <td><a href={"/league/" + league.idLeague}><img src={"/images/leagues/" + league.idLeague + ".png"} className="img-fluid" width="70"></img></a></td>
                <td>{format}</td><td>{signUpsOpen}</td>
                <td>{league.playersCount}/{league.maxNumberOfCoaches}</td></tr>));
            console.log(leaguesHTML);
        });
        
        return leaguesHTML;
    }

    render() {
        let list;
        if (this.state.leagues.length < 1) {
            list = <tr><td colSpan="5">No Leagues</td></tr>;
        } else {
            list = this.getHTML(this.state.leagues);
        };

        return (

            <div className="leagues container mt-4">
                <table className="table table-image">
                    <thead>
                        <tr>
                            <th>League Name</th>
                            <th>Logo</th>
                            <th>Singles/Doubles</th>
                            <th>Register</th>
                            <th>Number of Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default List;
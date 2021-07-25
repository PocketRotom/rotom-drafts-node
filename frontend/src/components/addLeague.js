import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkIfLeagueExists from "../utils/checkIfLeagueExists";
import checkIfUserHasLogin from '../utils/checkIfUserHasLogin';

class addLeague extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'isLoaded': true,
            'message': undefined,
            'user': undefined
        }

        this.makeLeague = this.makeLeague.bind(this);
    };

    async componentDidMount(){
        let user = await checkIfUserHasLogin();
        this.setState({user: user});
    }


    async makeLeague(e) {
        e.preventDefault();

        let leagueName = document.querySelector("#name").value;
        let maxPlayers = document.querySelector("#coaches").value;
        let format = document.querySelector('input[name="format"]:checked').value;
        let mega = document.querySelector("#mega").value;
        let sTier = document.querySelector("#sTier").value;
        let aTier = document.querySelector("#aTier").value;
        let bTier = document.querySelector("#bTier").value;
        let cTier = document.querySelector("#cTier").value;
        let dTier = document.querySelector("#dTier").value;
        let userID = this.state.user.userID;

        if (format == "singles") {
            format = 1;
        } else {
            format = 2;
        }


        debugger;

        let json = JSON.stringify({ leagueName: leagueName, userID: userID, maxNumberOfCoaches: maxPlayers, format: format, mega: mega, sTier: sTier, aTier: aTier, bTier: bTier, cTier: cTier, dTier: dTier });


        let newLeague;

        await axios.post(`${sessionStorage.getItem("apiURL")}/leagues/`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: response.data.error + ". This means the league is still not created" })
            } else {
                newLeague = response.data.data;
            }
        });


        let form_data = new FormData();
        form_data.append('id', newLeague);
        form_data.append('file', document.querySelector('#logo').files[0]);

        await axios.post(`${sessionStorage.getItem("apiURL")}/upload/leagues`, form_data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: "Error uploading the image, but you still created the league" })
            } else {
                this.setState({ message: "Created Successfully. You can go back" });
            }
        });

    }


    render() {


        if (this.state.isLoaded == false) {
            return <div>Loading Creation Form</div>
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
                <form method="post" encType="multipart/form-data" onSubmit={this.makeLeague}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" className="form-control" id="name" required autoFocus defaultValue="" maxLength="45" />
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="coaches" className="form-label">Max Number of Coaches</label>
                            <input type="number" name="coaches" className="form-control" id="coaches" defaultValue="32" required />
                        </div>
                        <div className="col-6">
                            <label htmlFor="format" className="form-label">Match Format</label><br />
                            <input type="radio" id="singles" name="format" defaultValue="singles" required /><label htmlFor="singles">Singles</label>
                            <input type="radio" id="doubles" name="format" defaultValue="doubles" /><label htmlFor="doubles">Doubles</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="mega" className="form-label">Number of Mega Tiers</label>
                                <input type="number" name="mega" className="form-control" id="mega" defaultValue="1" required />
                            </div>
                            <div className="col-2">
                                <label htmlFor="sTier" className="form-label">Number of S Tiers</label>
                                <input type="number" name="sTier" className="form-control" id="sTier" defaultValue="1" required />
                            </div>
                            <div className="col-2">
                                <label htmlFor="aTier" className="form-label">Number of A Tiers</label>
                                <input type="number" name="aTier" className="form-control" id="aTier" defaultValue="2" required />
                            </div>
                            <div className="col-2">
                                <label htmlFor="bTier" className="form-label">Number of B Tiers</label>
                                <input type="number" name="bTier" className="form-control" id="bTier" defaultValue="2" required />
                            </div>
                            <div className="col-2">
                                <label htmlFor="cTier" className="form-label">Number of C Tiers</label>
                                <input type="number" name="cTier" className="form-control" id="cTier" defaultValue="2" required />
                            </div>
                            <div className="col-2">
                                <label htmlFor="dTier" className="form-label">Number of D Tiers</label>
                                <input type="number" name="dTier" className="form-control" id="dTier" defaultValue="2" required />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="logo" className="form-label">League Logo (In PGN Format)</label><br />
                        <input type="file" id="logo" name="logo" accept=".png" required />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>)
    }
}

export default withRouter(addLeague);
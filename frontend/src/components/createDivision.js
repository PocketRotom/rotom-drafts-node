import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkToken from '../utils/checkToken';

class CreateDivisions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'isLoaded': true,
            'message': undefined,
            'user': undefined,
            'exists': true,
            'leagueID': undefined,

        }

        this.addDivision = this.addDivision.bind(this);
    };

    async componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({ leagueID: id });

        this.checkIfAdmin();
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


    async addDivision(e) {
        e.preventDefault();

        let name = document.querySelector("#name").value;

        let json = JSON.stringify({ name: name});

        await axios.post(`${sessionStorage.getItem("apiURL")}/leagues/${this.props.match.params.id}/divisions`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.data.success == false) {
                this.setState({ message: response.data.error + ". This means the league is still unupdated" })
            } else {
                this.setState({ message: "League updated successfully" });
            }
        });

    }




    render() {
        let message = [];
        if (this.state.isLoaded == false) {
            return <div>Loading Division New Form</div>
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
                <form method="post" enctype="multipart/form-data" onSubmit={this.addDivision}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Division Name</label>
                        <input type="text" name="name" class="form-control" id="name" autoFocus defaultValue="" maxLength="45" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>)
    }
}

export default withRouter(CreateDivisions);
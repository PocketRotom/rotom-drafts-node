import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import checkIfLeagueExists from "../utils/checkIfLeagueExists";
import checkToken from "../utils/checkToken";

class subHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'league': [],
            'isLoaded': false,
            'exists': true,
            'admin': false
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getLeague(id);
        this.checkIfAdmin();
    }

    async getLeague(id) {

        let exists = await checkIfLeagueExists(id);
        if (!exists) {
            this.setState({ 'exists': exists });
            return false;
        }
        let league;

        await axios.get(`${sessionStorage.getItem("apiURL")}/leagues/${id}`).then((response) => {
            league = response.data.data;
        })
        this.setState({ 'league': league[0], 'isLoaded': true });

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

    render() {


        if (this.state.isLoaded == false) {
            return <div>Loading Header</div>
        } else {
            let session = [];
            if (this.state.admin) {
                session.push((<Nav.Link href={"/league/manage/" + this.state.league.idLeague} key={1}>Manage This League</Nav.Link>));
                session.push((<Nav.Link href={"/league/createDivisions/" + this.state.league.idLeague} key={2}>Create Divisions</Nav.Link>));
                session.push((<Nav.Link href="#" key={3}>Manage This League Coaches (WIP)</Nav.Link>));
                session.push((<Nav.Link href={"/league/createMatches/" + this.state.league.idLeague} key={4}>Create Matches</Nav.Link>));
                session.push((<Nav.Link href="#" key={5}>Manage Tierlist (WIP)</Nav.Link>));
            }
            return (
                <Navbar expand="lg" bg="light">
                    <Container fluid>
                        <Navbar.Brand href={"/league/" + this.state.league.idLeague}>{this.state.league.name}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarSupportedContent" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto mb-2 mb-lg-0">
                                <Nav.Link href={"/league/matches/" + this.state.league.idLeague}>All matches</Nav.Link>
                                <Nav.Link href={"/league/tierlist/" + this.state.league.idLeague}>View Tierlist</Nav.Link>
                                {session}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>)
        }
    }
}

export default withRouter(subHeader);
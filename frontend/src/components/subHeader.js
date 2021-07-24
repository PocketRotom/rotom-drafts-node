import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import checkIfLeagueExists from "../utils/checkIfLeagueExists";

class subHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'league': [],
            'isLoaded': false,
            'exists': true
        }
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getLeague(id);
    }

    async getLeague(id) {

        let exists = await checkIfLeagueExists(id);
        if (!exists) {
            this.setState({ 'exists': exists });
            return false;
        }
        let league;

        await axios.get(`http://localhost:3001/leagues/${id}`).then((response) => {
            league = response.data.data;
        })
        this.setState({ 'league': league[0], 'isLoaded': true });

    }

    render() {
        if (this.state.isLoaded == false) {
            return <div>Loading Header</div>
        } else {
            return (
                <Navbar expand="lg" bg="light">
                    <Container fluid>
                        <Navbar.Brand href={"/league/" + this.state.league.idLeague}>{this.state.league.name}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarSupportedContent" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto mb-2 mb-lg-0">
                                <Nav.Link href={"/league/matches/" + this.state.league.idLeague}>All matches</Nav.Link>
                                <Nav.Link href={"/league/tierlist/" + this.state.league.idLeague}>View Tierlist</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>)
        }
    }
}

export default withRouter(subHeader);
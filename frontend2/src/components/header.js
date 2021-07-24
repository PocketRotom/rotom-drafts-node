import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";


class Header extends React.Component {
    render()  { return (
        <Navbar expand="lg" bg="light">
            <Container fluid>
                <Navbar.Brand href="/">Pocket Rotom Drafts</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link href="/">All Leagues</Nav.Link>
                        <Nav.Link href="/league/add">Create League</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar> )
    }
}

export default Header;
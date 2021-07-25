import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React from "react";
import axios from "axios";
//import '../login.css';


class Logout extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        this.makeLogin();
    }


    makeLogin() {
        localStorage.removeItem("userToken");
        sessionStorage.removeItem("userData");
        window.location.href = "/";
    }


    render() {
        return (<div></div>);
    }
}

export default Logout;
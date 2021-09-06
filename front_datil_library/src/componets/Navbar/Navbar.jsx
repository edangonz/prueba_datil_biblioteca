import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import cookie from 'react-cookies'

import './Navbar.css'

class NavbarComponent extends React.Component {
    closeSesion() {
        cookie.remove("token");
        this.props.closeSesion();
        this.props.history.push("/");
    }

    render(){
        return (
            <Navbar expand="lg" variant="dark">
            <Container>
                <Navbar.Brand><Link to="/app">Datil biblioteca</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="me-auto">
                    <NavDropdown title={this.props.user.username} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => this.closeSesion()}>Cerrar sesión</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        );
    };
}

export default withRouter(NavbarComponent);
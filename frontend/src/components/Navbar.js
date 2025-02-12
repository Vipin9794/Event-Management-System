import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './navbar.css'; // Optional: for additional custom styles

const Navbar = () => {
    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg">
            <Container>
                <BootstrapNavbar.Brand href="/">MyBrand</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Signup</Nav.Link>
                        <Nav.Link href="/services">Services</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
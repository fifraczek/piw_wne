import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';

export default class App extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Przetwarzanie i wizualizacja danych</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavDropdown title="Dane ogólne" id="basic-nav-dropdown">
                        <MenuItem href="wordcloud">Słowa kluczowe</MenuItem>
                        <MenuItem divider />
                        <MenuItem href="decades">Dekady</MenuItem>
                        <MenuItem href="years">Lata</MenuItem>
                        <MenuItem href="genres">Gatunki</MenuItem>
                    </NavDropdown>
                    <NavItem href="rates">Oceny</NavItem>
                </Nav>
            </Navbar>);
    }
}
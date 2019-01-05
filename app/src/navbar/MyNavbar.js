import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import {Icon} from '@blueprintjs/core';

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
                    <NavItem href="summary"><Icon icon='dashboard'/> Podsumowanie</NavItem>
                    <NavDropdown title={<span><Icon icon='layers'/> Dane ogólne</span>} id="basic-nav-dropdown">
                        <MenuItem href="wordcloud">Słowa kluczowe</MenuItem>
                        <MenuItem divider />
                        <MenuItem href="decades">Dekady</MenuItem>
                        <MenuItem href="years">Lata</MenuItem>
                        <MenuItem href="genres">Gatunki</MenuItem>
                    </NavDropdown>
                    <NavItem href="rates"><Icon icon='star'/> Oceny</NavItem>
                    <NavItem href="https://github.com/fifraczek/piw_wne/"><Icon icon='git-repo'/> Repozytorium</NavItem>
                </Nav>
            </Navbar>);
    }
}
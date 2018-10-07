import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import { connect } from 'react-redux';

class Navigation extends Component {

    // Render the component
    render() {
        return <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#home">In-app Pro Shop</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="#">
                    Link
                </NavItem>
                <NavItem eventKey={2} href="#">
                    Link
                </NavItem>
                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.4}>Separated link</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
//user: state.messageState.user
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
//dispatch: dispatch
});


// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
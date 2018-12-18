import React, {Component} from 'react';
import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import * as variables from '../variables';

const navbarImageColorLeft = props => props.theme.navbar.left;
const navbarImageColorRight = props => props.theme.navbar.right;

const StyledBootstrapNavbar = styled(Navbar)`
        background-image: linear-gradient(to right, ${navbarImageColorLeft}, ${navbarImageColorRight});
        background-color: ${props => props.theme.navbar.bg}; 
        width: 100%;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid ${props => props.theme.navbar.bottom};
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        flex-grow: 1;
        margin: 0;
        margin-bottom: 20px;
        padding-right: ${variables.SPACING_15};
                
        .container {
            width: 100% !important;
            
            @media (min-width: 768px) {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;
            }
        }
        
        @media (min-width: 768px) {
            ul {
              float: right;
            }
        }
    }
`;

export class AppNavbar extends Component {
    render() {
        const {...props} = this.props;
        return (
            <StyledBootstrapNavbar
                {...props}
            />
        )
    }
}

const StyledBootstrapNavbarHeader = styled(Navbar.Header)`
    &&& {
        flex-grow: 2;
    }
`;

export class AppNavbarHeader extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapNavbarHeader {...props}/>
    }
}

const StyledBootstrapNavbarBrand = styled(Navbar.Brand)`
    &&& {
        color: ${props => props.theme.navbar.brand};
        text-shadow: 0 1px 0 rgba(19, 16, 16, 0.75);
        font-family: 'Raleway Semi-Bold', sans-serif;
    }
`;

export class AppNavbarBrand extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapNavbarBrand {...props}/>
    }
}

const StyledBootstrapNav = styled(Nav)`    
    
    &&& .active > .dropdown-toggle {
        color: ${props => props.theme.navbar.button};
        background-image: unset !important;
        background-color: unset;
        box-shadow: unset
    }
    
    &&& .open > .dropdown-toggle {
        color: ${props => props.theme.navbar.button};
        background-image: unset !important;
        background-color: unset;
        box-shadow: unset
    }
    
`;

export class AppNav extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapNav {...props}/>
    }
}

const StyledBootstrapNavDropdown = styled(NavDropdown)`
    font-family: 'Raleway Semi-Bold', sans-serif;

    &&& .dropdown-toggle {
        color: ${props => props.theme.navbar.button};
    }

    &&& .dropdown-toggle :hover {
        color: ${props => props.theme.navbar.hover};
        background-color: ${props => props.theme.navbar.bottom};
    }
    
    &&& .dropdown-toggle :focus {
        color: ${props => props.theme.navbar.button};
    }
    
    &&& ul {
        color: ${props => props.theme.navbar.brand};
        background-color: ${props => props.theme.navbar.bg};
    }

    &&& ul .active > a {
        color: ${props => props.theme.menuitem.active};
        background-color: ${props => props.theme.navbar.left};
        background-image: unset;
    }
    
    &&& .disabled > a {
        color: ${props => props.theme.menuitem.disabled};
    }

    &&& .disabled > a:hover {
        color: ${props => props.theme.menuitem.disabled};
    }

    &&& .disabled > a:focus {
        outline: none;
    }

`;

export class AppNavDropdown extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapNavDropdown {...props}/>
    }
}

const StyledBootstrapMenuItem = styled(MenuItem)`

    font-family: 'Raleway Semi-Bold', sans-serif;
    &&& a:hover {
        color:  ${props => props.theme.menuitem.hover};
        background-color: ${props => props.theme.menuitem.active};
        background-image: unset;
    }

    &&& a {
        color: ${props => props.theme.menuitem.button};
    }
`;

export class AppMenuItem extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapMenuItem {...props}/>
    }
}

const StyledBootstrapMonoMenuItem = styled(AppMenuItem)`

    font-family: 'PT Mono', monospace;
    
`;

export class AppMonoMenuItem extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapMonoMenuItem {...props}/>
    }
}
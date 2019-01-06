import React, {Component} from "react";
import styled from "styled-components";
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap";

import * as variables from "../variables";
import {slideInRight} from "../animations";

const navbarImageColorLeft = props => props.theme.navbar.left;
const navbarImageColorRight = props => props.theme.navbar.right;

const StyledBootstrapNavbar = styled(Navbar)`

        align-items: center;
        background-image: linear-gradient(to right, ${navbarImageColorLeft}, ${navbarImageColorRight});
        background-color: ${props => props.theme.navbar.bg}; 
        border-radius: 0;
        border: none;
        border-bottom: 1px solid ${props => props.theme.navbar.bottom};
        box-shadow: 0 0 7px 0 rgba(25, 25, 25, 0.43);
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        justify-content: flex-end;
        margin: 0;
        margin-bottom: 20px;
        padding-right: ${variables.SPACING_15};
        width: 100%;
                
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

export class KitNavbar extends Component {
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

export class KitNavbarHeader extends Component {
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

export class KitNavbarBrand extends Component {
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
        box-shadow: unset;
    }
    
`;

export class KitNav extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapNav {...props}/>
    }
}

const StyledBootstrapNavDropdown = styled(NavDropdown)`

    font-family: 'Raleway Semi-Bold', sans-serif;
    font-size: 14px;
    animation: ${slideInRight} .23s ease;
    
    &&& .dropdown-toggle {
        color: ${props => props.theme.navbar.button};
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.75);
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
        text-shadow: none;
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

export class KitNavDropdown extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapNavDropdown {...props}/>
    }
}

const StyledBootstrapMenuItem = styled(MenuItem)`

    font-family: 'Raleway Semi-Bold', sans-serif;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.75);
    &&& a:hover {
        color:  ${props => props.theme.menuitem.hover};
        background-color: ${props => props.theme.menuitem.active};
        background-image: unset;
    }

    &&& a {
        color: ${props => props.theme.menuitem.button};
    }
    
`;

export class KitMenuItem extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapMenuItem {...props}/>
    }
}

const StyledBootstrapMonoMenuItem = styled(KitMenuItem)`

    font-family: 'PT Mono', monospace;
    text-align: right;
    .glyphicon {
        font-size: 10px;
    }

`;

export class KitMonoMenuItem extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapMonoMenuItem {...props}/>
    }
}
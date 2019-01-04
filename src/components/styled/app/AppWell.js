import React from "react";
import {Component} from "react";
import {Well} from "react-bootstrap";
import styled from "styled-components";

import {slideInLeft} from "../animations";

const navbarImageColorTop = props => props.theme.well.top;
const navbarImageColorBottom = props => props.theme.well.bottom;

const StyledBootstrapWell = styled(Well)`

    &&& {
        background-image: linear-gradient(to bottom, ${navbarImageColorTop}, ${navbarImageColorBottom});
        background-color: ${props => props.theme.well.bg}; 
        border: 1px solid ${props => props.theme.well.border};
        box-shadow: 0 1px 7px 2px rgba(25, 25, 25, 0.43);
        border-radius: 10px;
        padding-top: 0;
    }
    
    & h2 {
        color: ${props => props.theme.well.head};
        text-shadow: 0 1px 0 rgba(19, 16, 16, 0.75);
        font-family: 'Raleway Semi-Bold', sans-serif;
    }    
`;

export class AppWell extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapWell {...props}/>
    }
}

const SlidingBootstrapWell = styled(AppWell)`
    animation: ${slideInLeft} .23s ease-out;
`;

export class AppSlidingWell extends Component {
    render() {
        const {...props} = this.props;
        return <SlidingBootstrapWell {...props}/>
    }
}

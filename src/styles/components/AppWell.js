import styled from "styled-components";
import {Well} from "react-bootstrap";
import {Component} from "react";
import React from "react";

const navbarImageColorTop = props => props.theme.well.top;
const navbarImageColorBottom = props => props.theme.well.bottom;

const StyledBootstrapWell = styled(Well)`

    &&& {
        background-image: linear-gradient(to bottom, ${navbarImageColorTop}, ${navbarImageColorBottom});
        background-color: ${props => props.theme.well.bg}; 
        padding-top: 0;
    }
    
    & h2 {
        color: ${props => props.theme.well.head};
        text-shadow: 0 1px 0 rgba(19, 16, 16, 0.75);
    }
    
    & label {
        color: ${props => props.theme.well.label};
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    
`;

export class AppWell extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapWell {...props}/>
    }
}

import styled from "styled-components";
import {Button, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {Component} from "react";
import React from "react";

const buttonImageColorTop = props => props.theme.button.top;
const buttonImageColorBottom = props => props.theme.button.bottom;

const StyledBootstrapButton = styled(Button)`

    &&& {
        color: ${props => props.disabled ? props.theme.button.disabled : props.theme.button.label}; 
        background-color: ${props => props.theme.button.bg}; 
        background-image: linear-gradient(to bottom, ${buttonImageColorTop}, ${buttonImageColorBottom});
        font-family: 'Raleway Semi-Bold', sans-serif;
    }
    
    &&& :hover {
        color: ${props => props.disabled ? props.theme.button.disabled : props.theme.button.hover};
    }

`;

export class AppButton extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapButton {...props}/>
    }
}

const StyledBootstrapToggleButton = styled(ToggleButton)`

    &&& {
        color: ${props => props.disabled ? props.theme.button.disabled : props.theme.button.label}; 
        background-color: ${props => props.theme.button.bg}; 
        background-image: linear-gradient(to bottom, ${buttonImageColorTop}, ${buttonImageColorBottom});
        font-family: 'Raleway Semi-Bold', sans-serif;
    }
    
    &&& :hover {
        color: ${props => props.theme.button.hover};
    }
`;

export class AppToggleButton extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapToggleButton {...props}/>
    }
}


export const AppToggleButtonGroup = styled(ToggleButtonGroup)`
    
    &&& .active {
        background-image: unset;
    }
`;


import styled from 'styled-components';
import {Panel, PanelGroup} from 'react-bootstrap';
import {Component} from "react";
import React from "react";


const panelImageColorLeft = props => props.theme.navbar.left;
const panelImageColorRight = props => props.theme.navbar.right;


const StyledBootstrapFlexPanel = styled(Panel)`
    &&& {
        padding: 0;
        border-radius: 10px;
        box-shadow: 0 1px 7px 2px rgba(25, 25, 25, 0.43);
        border: 1px solid ${props => props.theme.panel.bg};
        background-color: ${props => props.theme.panel.bg}; 
     }
`;

export class AppPanel extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapFlexPanel {...props}/>
    }
}


const StyledBootstrapPanelHeading = styled(Panel.Heading)`
    &&& {
        background-image: linear-gradient(to right, ${panelImageColorLeft}, ${panelImageColorRight});
        background-color: ${props => props.theme.panel.bg}; 
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: 1px solid ${props => props.theme.panel.divider};
        color: ${props => props.theme.panel.subtitle};
        text-shadow: 0 1px 0 rgba(19, 16, 16, 0.75);
        font-family: 'Raleway', sans-serif;
     }
`;

export class AppPanelHeading extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapPanelHeading {...props}/>
    }
}

const StyledBootstrapFlexPanelTitle = styled(Panel.Title)`
    &&& {
        color: ${props => props.theme.panel.title};
        text-shadow: 0 1px 0 rgba(19, 16, 16, 0.75);
        font-family: 'Raleway Semi-Bold', sans-serif;
    }
`;

export class AppPanelTitle extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapFlexPanelTitle {...props}/>
    }
}

const StyledBootstrapPanelBody = styled(Panel.Body)`
    background-image: linear-gradient(to right, ${panelImageColorLeft}, ${panelImageColorRight});
    background-color: ${props => props.theme.panel.bg}; 
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
        @media (max-width: 1023px) {
        flex-wrap: wrap;
    }
`;

export class AppPanelBody extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapPanelBody {...props}/>
    }
}

const StyledBootstrapPanelGroup = styled(PanelGroup)`
  margin: 25px;
  flex-grow: 2;  
`;

export class AppPanelGroup extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapPanelGroup {...props}/>
    }
}

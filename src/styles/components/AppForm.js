import styled from "styled-components";
import {Form, HelpBlock} from "react-bootstrap";
import {Component} from "react";
import React from "react";

const StyledBootstrapForm = styled(Form)`

    & label {
        color: ${props => props.theme.form.label};
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.50);
    }
    
`;

export class AppForm extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapForm {...props}/>
    }
}


const StyledBootstrapHelpBlock = styled(HelpBlock)`

    &&& {
        color: ${props => props.theme.form.help};
        text-shadow: 0 1px 0 rgba(0, 255, 255, 0.25);
    }
    
`;

export class AppHelpBlock extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapHelpBlock {...props}/>
    }
}

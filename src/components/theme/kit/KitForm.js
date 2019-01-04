import React from "react";
import {Component} from "react";
import styled from "styled-components";
import CurrencyInput from "react-currency-masked-input";
import {Form, FormControl, HelpBlock} from "react-bootstrap";

const StyledBootstrapForm = styled(Form)`

    & label {
        color: ${props => props.theme.form.label};
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.50);
    }
    
`;

export class KitForm extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapForm {...props}/>
    }
}

const StyledBootstrapFormControl = styled(FormControl)`

    color: ${props => props.theme.form.input};
    resize: none;
`;

export class KitFormControl extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapFormControl {...props}/>
    }
}


const StyledBootstrapCurrencyInput = styled(CurrencyInput)`

    color: ${props => props.theme.form.input};
    
`;

export class KitCurrencyInput extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapCurrencyInput {...props}/>
    }
}

const StyledBootstrapHelpBlock = styled(HelpBlock)`

    &&& {
        color: ${props => props.theme.form.help};
        text-shadow: 0 1px 0 rgba(0, 255, 255, 0.25);
    }
    
`;

export class KitHelpBlock extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapHelpBlock {...props}/>
    }
}

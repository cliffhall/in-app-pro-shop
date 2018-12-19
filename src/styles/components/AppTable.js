import styled from "styled-components";
import {Table} from "react-bootstrap";
import {Component} from "react";
import React from "react";


const StyledBootstrapTable = styled(Table)`

    &&& {
        color: ${props => props.theme.table.header}; 
        background-color: ${props => props.theme.table.header_bg}; 
        font-family: 'Raleway Semi-Bold', sans-serif;
    }

    &&& > tbody {
        font-family: 'Raleway', sans-serif;
    }

`;

export class AppTable extends Component {
    render() {
        const {...props} = this.props;
        return <StyledBootstrapTable {...props}/>
    }
}
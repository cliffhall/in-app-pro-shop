import React, { Component } from 'react';
import { Panel } from "react-bootstrap";

class SKUTypeView extends Component {

    render() {

        const {skuType} = this.props;

        return  <Panel eventKey={skuType.skuTypeId}>
            <Panel.Heading>
                <Panel.Title>{skuType.name}</Panel.Title>
                {skuType.description}
            </Panel.Heading>
            <Panel.Body>
            SKUs go here as table
            </Panel.Body>
        </Panel>;
    }
}

export default SKUTypeView;
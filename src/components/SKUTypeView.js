import React, { Component } from 'react';
import {Button, Panel, Table} from "react-bootstrap";
import connect from "react-redux/es/connect/connect";

class SKUTypeView extends Component {

    render() {

        const {skuType} = this.props;

        return  <Panel eventKey={skuType.skuTypeId}>
            <Panel.Heading>
                <Panel.Title>
                    {skuType.name}
                    <div className="pull-right">
                        <Button>Add SKU</Button>
                    </div>
                </Panel.Title>
                {skuType.description}
            </Panel.Heading>
            <Panel.Body>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Flathead Screwdriver</td>
                        <td>Old school, slip it in the slot in turn</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Trucker Cap</td>
                        <td>Wide, flat brim. Ugly as hell.</td>
                    </tr>
                    </tbody>
                </Table>
            </Panel.Body>
        </Panel>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    //showSKUTForm: () => dispatch(showSKUForm()),
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(SKUTypeView);

import React, { Component } from 'react';
import { connect } from "react-redux";
import { AtomSpinner } from "react-epic-spinners";
import { Button, Panel, Table, Well } from "react-bootstrap";

import SKUView from './SKUView';

class SKUTypeView extends Component {

    // Render the SKU rows
    renderSKUs = () => {
        const {skusFetched, skus, skuType} = this.props;

        return skusFetched
            ? skus.map( sku => skuType.skuTypeId === sku.skuTypeId ? <SKUView key={sku.skuId} sku={sku}/> : null )
            : <Well>
                <h2>Fetching SKUs</h2>
                <AtomSpinner color='red'/>
            </Well>;
    };

    render() {

        const {skuType, skuTypeFormDisplayed} = this.props;

        return  <Panel eventKey={skuType.skuTypeId}>
            <Panel.Heading>
                <Panel.Title>
                    {skuType.name}
                    <div className="pull-right">
                        {skuTypeFormDisplayed
                            ? null
                            : <Button>Add SKU</Button>}
                    </div>
                </Panel.Title>
                {skuType.description}
            </Panel.Heading>
            <Panel.Body>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Consumable</td>
                            <td>Limited</td>
                            <td>Limit</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSKUs()}
                    </tbody>
                </Table>
            </Panel.Body>
        </Panel>;
    }
}

const mapStateToProps = (state) => ({
    skuTypeFormDisplayed: state.skuTypeState.skuTypeFormDisplayed,
    skusFetched: state.skuState.skusFetched,
    skus: state.skuState.skus
});

const mapDispatchToProps = (dispatch) => ({
    //showSKUForm: () => dispatch(showSKUForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SKUTypeView);

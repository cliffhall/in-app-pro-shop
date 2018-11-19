import React, { Component } from 'react';
import {Panel, PanelGroup, Well} from "react-bootstrap";
import { connect } from 'react-redux';
import SKUTypeView from './SKUTypeView';
import {AtomSpinner} from "react-epic-spinners";

class ShopView extends Component {

    renderSKUTypes = () => {
        const {skuTypesFetched, skuTypes} = this.props;

        return skuTypesFetched
            ? skuTypes.map( skuType => <SKUTypeView skuType={skuType}/> )
            : <Well>
                <h2>Fetching SKU Types</h2>
                <AtomSpinner color='red'/>
            </Well>;
    };

    render() {

        const {shop} = this.props;

        return  <Panel>
                    <Panel.Heading>
                        <Panel.Title>{shop.name}</Panel.Title>
                        {shop.description}
                    </Panel.Heading>
                    <Panel.Body>
                        <PanelGroup accordion id="skuTypes">
                            {
                                this.renderSKUTypes()
                            }
                        </PanelGroup>
                    </Panel.Body>
                </Panel>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    selectedAccount: state.accountState.selectedAccount,
    shops: state.shopState.shops,
    shop: state.shopState.shops.find(shop => shop.shopId === state.shopState.selectedShopId),
    selectedShopId: state.shopState.selectedShopId,
    shopsFetched: state.shopState.shopsFetched,
    selectedSKUTypeId: state.skuTypeState.selectedSKUTypeId,
    skuTypesFetched: state.skuTypeState.skuTypesFetched,
    skuTypes: state.skuTypeState.skuTypes
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    //dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(ShopView);
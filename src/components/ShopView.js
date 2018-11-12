import React, { Component } from 'react';
import { Panel } from "react-bootstrap";
import { connect } from 'react-redux';


class ShopView extends Component {

    // Render the component
    render() {

        const {shop} = this.props;

        return  <Panel>
                    <Panel.Heading>{shop.name}</Panel.Heading>
                    <Panel.Body>

                    </Panel.Body>
                </Panel>;
    }
}

// Map required state into props
const mapStateToProps = (state) => ({
    accounts: state.accountState.accounts,
    selectedAccount: state.accountState.selectedAccount,
    shops: state.shopState.shops,
    shop: state.shopState.shops.find(shop => shop.shopId === state.shopState.selectedShopId),
    selectedShopId: state.shopState.selectedShopId,
    shopsFetched: state.shopState.shopsFetched,
    selectedSKUTypeId: state.skuTypeState.selectedSKUTypeId,
    skuTypesFetched: state.skuTypeState.skuTypesFetched
});

// Map dispatch function into props
const mapDispatchToProps = (dispatch) => ({
    //dispatch: dispatch
});

// Export props-mapped HOC
export default connect(mapStateToProps, mapDispatchToProps)(ShopView);
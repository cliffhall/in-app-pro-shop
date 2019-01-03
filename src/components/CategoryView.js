import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from "react-redux";

import ItemList from "./ItemList";
import ItemForm from "./ItemForm";
import {
    AppPanel,
    AppPanelHeading,
    AppPanelTitle,
    AppPanelBody,
    AppButton
} from "../styles";
import {
    priceChanged,
    descChanged,
    nameChanged,
    consumableChanged,
    limitedChanged,
    limitChanged,
    toggleForm,
    createNewSKU
} from "../store/sku/SKUActions";
import {selectSKUType} from "../store/sku_type/SKUTypeActions";


class CategoryView extends Component {

    // Toggle Item Form and select/deselect Category
    handleToggleForm = () => {

        const {
            skuType,
            skuFormDisplayed,
            toggleForm,
            selectSKUType
        } = this.props;
        if (!skuFormDisplayed) {
            setTimeout( () => {
                this.scrollToTop();
            }, 100)
        }
        selectSKUType(skuFormDisplayed ? null: skuType.skuTypeId);
        toggleForm();

    };

    scrollToTop = () => {
        const target = ReactDOM.findDOMNode(this).offsetTop - 70;
        window.scrollTo({
            top: target,
            behavior: "smooth"
        })
    };

    render() {

        const {
            skuType,
            selectedSKUTypeId,
            skuTypeFormDisplayed,
            skuFormDisplayed
        } = this.props;

        return  <React.Fragment><AppPanel>
            <AppPanelHeading>
                <AppPanelTitle>
                    {skuType.name}
                    <div className="pull-right">
                        {skuTypeFormDisplayed || skuFormDisplayed
                            ? null
                            : <AppButton onClick={this.handleToggleForm}>Add Item</AppButton>}
                    </div>
                </AppPanelTitle>
                {skuType.description}
            </AppPanelHeading>
            <AppPanelBody>
                <ItemList {...this.props}/>
                {skuFormDisplayed && selectedSKUTypeId === skuType.skuTypeId ? <ItemForm {...this.props}/> : null}
            </AppPanelBody>
        </AppPanel>
            <div>&nbsp;</div>
        </React.Fragment>;
    }
}

const mapStateToProps = (state) => ({
    selectedAccount: state.accountState.selectedAccount,
    skuTypeFormDisplayed: state.skuTypeState.skuTypeFormDisplayed,
    skuFormDisplayed: state.skuState.skuFormDisplayed,
    skusFetched: state.skuState.skusFetched,
    skus: state.skuState.skus,
    selectedSKUTypeId: state.skuTypeState.selectedSKUTypeId,
    creatingSKU: state.skuState.creatingSKU,
    newSKU: state.skuState.newSKU
});

const mapDispatchToProps = (dispatch) => ({
    toggleForm: () => dispatch(toggleForm()),
    selectSKUType: skuTypeId => dispatch(selectSKUType(skuTypeId)),
    priceChanged: price => {dispatch(priceChanged(price))},
    nameChanged: name => {dispatch(nameChanged(name))},
    descChanged: description => {dispatch(descChanged(description))},
    consumableChanged: consumable => {dispatch(consumableChanged(consumable))},
    limitedChanged: limited => {dispatch(limitedChanged(limited))},
    limitChanged: limit => {dispatch(limitChanged(limit))},
    createNewSKU: (contract, owner, shopId, skuTypeId, price, name, description, consumable, limited, limit) => dispatch(createNewSKU(contract, owner, shopId, skuTypeId, price, name, description, consumable, limited, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryView);

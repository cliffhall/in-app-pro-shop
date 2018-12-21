import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AtomSpinner, HollowDotsSpinner } from "react-epic-spinners";
import { FormGroup, FormControl } from "react-bootstrap";

import SKUTypeView from './SKUTypeView';

import { CONTRACTS } from "../constants";
import {
    FlexChild,
    AppPanel,
    AppPanelHeading,
    AppPanelTitle,
    AppPanelBody,
    AppPanelGroup,
    AppWell,
    AppButton,
    AppForm,
    AppFormControl,
    AppHelpBlock
} from "../styles";
import { toggleTypeForm, createNewSKUType, nameChanged, descChanged } from "../store/sku_type/SKUTypeActions";

class ShopView extends Component {

    // Render the SKU Type panels in a responsive panel group
    renderSKUTypeList = () => {
        return <AppPanelGroup id="skuTypes">
            {
                this.renderSKUTypes()
            }
        </AppPanelGroup>
    };

    // Render the SKU Type panels
    renderSKUTypes = () => {
        const {skuTypesFetched, skuTypes, drizzle, shop} = this.props;

        return skuTypesFetched
            ? skuTypes.map( skuType => <SKUTypeView drizzle={drizzle} key={skuType.skuTypeId} skuType={skuType} shop={shop}/> )
            : <AppWell>
                <h2>Fetching SKU Types</h2>
                <AtomSpinner color='red'/>
            </AppWell>;
    };

    // Render the New SKU Type form
    renderNewSKUTypeForm = () => {

        const {
            drizzle,
            selectedAccount,
            selectedShopId,
            name,
            description,
            createNewSKUType,
            nameChanged,
            descChanged,
            creatingSKUType,
            toggleTypeForm
        } = this.props;

        const SUCCESS = 'success';
        const ERROR = 'error';

        const handleSubmit = () => {
            createNewSKUType(drizzle.contracts[CONTRACTS.STOCK_ROOM], selectedAccount, selectedShopId, name, description);
        };

        const getNameValidationState = () => {
            return (name.length === 0) ? null : (name.length >= 3) ? SUCCESS : ERROR;
        };

        const getDescValidationState = () => {
            return (description.length === 0) ? null : (description.length >= 5) ? SUCCESS : ERROR;
        };

        const isSubmitDisabled = () => {
            return (
                getNameValidationState() !== SUCCESS ||
                getDescValidationState() !== SUCCESS
            );
        };

        const handleNameChange = e => {
            nameChanged(e.target.value);
        };

        const handleDescChange = e => {
            descChanged(e.target.value);
        };

        return <FlexChild>
            <AppWell>
                    <AppForm>
                        <h2>
                            Add Category
                        </h2>
                        <FormGroup
                            controlId='nameField'
                            validationState={getNameValidationState()}>
                            <AppFormControl
                                disabled={creatingSKUType}
                                type="text"
                                bsSize='large'
                                placeholder="Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <FormControl.Feedback />
                            {(getNameValidationState() === ERROR)
                                ? <AppHelpBlock>Enter at least 3 characters</AppHelpBlock>
                                : null}
                        </FormGroup>

                        <FormGroup
                            controlId='descField'
                            validationState={getDescValidationState()}>
                            <AppFormControl
                                disabled={creatingSKUType}
                                componentClass="textarea"
                                bsSize='large'
                                placeholder="Description"
                                value={description}
                                onChange={handleDescChange}
                            />
                            <FormControl.Feedback />
                            {(getDescValidationState() === ERROR)
                                ? <AppHelpBlock>Enter at least 5 characters</AppHelpBlock>
                                : null}
                        </FormGroup>

                        {creatingSKUType
                            ? <HollowDotsSpinner color='black'/>
                            : <AppButton
                                bsSize='large'
                                disabled={isSubmitDisabled()}
                                onClick={handleSubmit}>Create</AppButton>}

                        <span>&nbsp;</span>

                        <AppButton
                            onClick={toggleTypeForm}
                            bsSize='large'>Cancel</AppButton>


                    </AppForm>
            </AppWell>
        </FlexChild>;
    };

    // Render the Shop panel
    render() {

        const {shop, toggleTypeForm, skuTypeFormDisplayed, skuFormDisplayed} = this.props;

        return  <AppPanel>
                    <AppPanelHeading>
                        <AppPanelTitle>
                            {shop.name}
                            <div className="pull-right">
                            {skuTypeFormDisplayed || skuFormDisplayed
                                ? null
                                : <AppButton onClick={toggleTypeForm}>Add Category</AppButton>}
                            </div>
                        </AppPanelTitle>
                        {shop.description}
                    </AppPanelHeading>
                    <AppPanelBody>
                        {this.renderSKUTypeList()}
                        {skuTypeFormDisplayed ? this.renderNewSKUTypeForm() : null}
                    </AppPanelBody>
                </AppPanel>;
    }
}

const mapStateToProps = (state) => ({
    selectedAccount: state.accountState.selectedAccount,
    selectedShopId: state.shopState.selectedShopId,
    selectedSKUTypeId: state.skuTypeState.selectedSKUTypeId,
    shops: state.shopState.shops,
    shop: state.shopState.shops.find(shop => shop.shopId === state.shopState.selectedShopId),
    skuTypes: state.skuTypeState.skuTypes,
    skuType: state.shopState.shops.find(skuType => skuType.skuTypeId === state.shopState.selectedSKUTypeId),
    skuTypesFetched: state.skuTypeState.skuTypesFetched,
    creatingSKUType: state.skuTypeState.creatingSKUType,
    skuTypeFormDisplayed: state.skuTypeState.skuTypeFormDisplayed,
    skuFormDisplayed: state.skuState.skuFormDisplayed,
    name: state.skuTypeState.newSKUType.name,
    description: state.skuTypeState.newSKUType.description
});

const mapDispatchToProps = (dispatch) => ({
    createNewSKUType: (contract, owner, shopId, name, description) => dispatch(createNewSKUType(contract, owner, shopId, name, description)),
    toggleTypeForm: () => dispatch(toggleTypeForm()),
    nameChanged: name => {dispatch(nameChanged(name))},
    descChanged: description => {dispatch(descChanged(description))},
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopView);
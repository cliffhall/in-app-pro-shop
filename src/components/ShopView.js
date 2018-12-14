import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AtomSpinner, HollowDotsSpinner } from "react-epic-spinners";
import {Panel, Glyphicon, Well, Button, Form, FormGroup, FormControl, HelpBlock, Label} from "react-bootstrap";

import SKUTypeView from './SKUTypeView';

import { CONTRACTS } from "../constants";
import { FlexChild, PanelBodyFlexRow, PanelGroupFlexCol } from "../styles";
import { toggleTypeForm, createNewSKUType, nameChanged, descChanged } from "../store/sku_type/SKUTypeActions";

class ShopView extends Component {

    // Render the SKU Type panels in a responsive panel group
    renderSKUTypeList = () => {
        return <PanelGroupFlexCol id="skuTypes">
            {
                this.renderSKUTypes()
            }
        </PanelGroupFlexCol>
    };

    // Render the SKU Type panels
    renderSKUTypes = () => {
        const {skuTypesFetched, skuTypes, drizzle, shop} = this.props;

        return skuTypesFetched
            ? skuTypes.map( skuType => <SKUTypeView drizzle={drizzle} key={skuType.skuTypeId} skuType={skuType} shop={shop}/> )
            : <Well>
                <h2>Fetching SKU Types</h2>
                <AtomSpinner color='red'/>
            </Well>;
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
            return (name.length === 0) ? null : (name.length > 5) ? SUCCESS : ERROR;
        };

        const getDescValidationState = () => {
            return (description.length === 0) ? null : (description.length > 10) ? SUCCESS : ERROR;
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
            <Panel>
                <Panel.Heading>
                    <Panel.Title>
                        Create SKU Type
                        <div className="pull-right">
                            <Button  onClick={toggleTypeForm} bsSize='xsmall'><Glyphicon glyph="remove" /></Button>
                        </div>
                    </Panel.Title>
                    SKU types allow you to categorize your Shop's SKUs
                </Panel.Heading>
                <Panel.Body>
                    <Form>

                        <FormGroup
                            controlId='nameField'
                            validationState={getNameValidationState()}>
                            <FormControl
                                disabled={creatingSKUType}
                                type="text"
                                bsSize='large'
                                placeholder="SKU Type Name"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <FormControl.Feedback />
                            {(getNameValidationState() === ERROR)
                                ? <HelpBlock>Enter at least 5 characters</HelpBlock>
                                : null}
                        </FormGroup>

                        <FormGroup
                            controlId='descField'
                            validationState={getDescValidationState()}>
                            <FormControl
                                disabled={creatingSKUType}
                                componentClass="textarea"
                                bsSize='large'
                                placeholder="Description"
                                value={description}
                                onChange={handleDescChange}
                            />
                            <FormControl.Feedback />
                            {(getDescValidationState() === ERROR)
                                ? <HelpBlock>Enter at least 10 characters</HelpBlock>
                                : null}
                        </FormGroup>

                        {creatingSKUType
                            ? <HollowDotsSpinner color='black'/>
                            : <Button
                                bsSize='large'
                                disabled={isSubmitDisabled()}
                                onClick={handleSubmit}>Create</Button>}

                    </Form>
                </Panel.Body>
            </Panel>
        </FlexChild>;
    };

    // Render the Shop panel
    render() {

        const {shop, toggleTypeForm, skuTypeFormDisplayed, skuFormDisplayed} = this.props;

        return  <Panel>
                    <Panel.Heading>
                        <Panel.Title>
                            {shop.name}
                            <div className="pull-right">
                            {skuTypeFormDisplayed || skuFormDisplayed
                                ? null
                                : <Button onClick={toggleTypeForm}>Add SKU Type</Button>}
                            </div>
                        </Panel.Title>
                        <Label bsStyle="success"><Glyphicon glyph={shop.fiat.toLowerCase()}/></Label>&nbsp;|&nbsp;{shop.description}
                    </Panel.Heading>
                    <PanelBodyFlexRow>
                        {this.renderSKUTypeList()}
                        {skuTypeFormDisplayed ? this.renderNewSKUTypeForm() : null}
                    </PanelBodyFlexRow>
                </Panel>;
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
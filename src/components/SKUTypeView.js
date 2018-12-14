import React, { Component } from 'react';
import { connect } from "react-redux";
import { AtomSpinner, HollowDotsSpinner } from "react-epic-spinners";
import { Button, Checkbox, Form, FormControl, FormGroup, Glyphicon, HelpBlock, Panel, Table, Well } from "react-bootstrap";
import CurrencyInput from 'react-currency-masked-input'

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
import SKUView from './SKUView';
import {CONTRACTS, CURRENCIES} from "../constants";
import { selectSKUType } from "../store/sku_type/SKUTypeActions";
import { FlexChild, PanelBodyFlexRow, PanelGroupFlexCol } from "../styles";

class SKUTypeView extends Component {

    renderSKUList = () => {
        const {skusFetched, skuType, shop} = this.props;
        return skusFetched
            ? <PanelGroupFlexCol id={`skus-${skuType.skuTypeId}`}>
                    <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Description</td>
                        <td align="right">Price&nbsp;<Glyphicon glyph={CURRENCIES[shop.fiat].icon} /></td>
                        <td align="middle">Consumable</td>
                        <td align="middle">Limited</td>
                        <td align="right">Limit</td>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderSKUs()}
                    </tbody>
                  </Table>
              </PanelGroupFlexCol>
            : <Well>
                <h2>Fetching SKUs</h2>
                <AtomSpinner color='red'/>
            </Well>;
    };

    // Render the SKU rows
    renderSKUs = () => {
        const {skus, skuType} = this.props;
        return skus.map( sku => skuType.skuTypeId === sku.skuTypeId ? <SKUView key={sku.skuId} sku={sku}/> : null );
    };

    // Render the New SKU form
    renderNewSKUForm = () => {

        const {
            drizzle,
            shop,
            skuType,
            newSKU,
            selectedAccount,
            createNewSKU,
            priceChanged,
            nameChanged,
            descChanged,
            consumableChanged,
            limitedChanged,
            limitChanged,
            creatingSKU,
            toggleForm
        } = this.props;

        const SUCCESS = 'success';
        const ERROR = 'error';

        const handleSubmit = () => {
            createNewSKU(
                drizzle.contracts[CONTRACTS.STOCK_ROOM],
                selectedAccount,
                skuType.shopId,
                skuType.skuTypeId,
                newSKU.price,
                newSKU.name,
                newSKU.description,
                newSKU.consumable,
                newSKU.limited,
                newSKU.limit);
        };

        const getNameValidationState = () => {
            return (newSKU.name.length === 0) ? null : (newSKU.name.length > 1) ? SUCCESS : ERROR;
        };

        const getDescValidationState = () => {
            return (newSKU.description.length === 0) ? null : (newSKU.description.length > 1) ? SUCCESS : ERROR;
        };

        const getPriceValidationState = () => {
            return (typeof newSKU.price === 'number' && newSKU.price === 0) ? null : (newSKU.price > 0) ? SUCCESS : ERROR;
        };

        const getLimitValidationState = () => {
            return (typeof newSKU.limit === 'number' && newSKU.limit === 0) ? null : (newSKU.limit > 0) ? SUCCESS : ERROR;
        };

        const isSubmitDisabled = () => {
            return (
                getNameValidationState() !== SUCCESS ||
                getDescValidationState() !== SUCCESS ||
                getPriceValidationState() === ERROR ||
                getLimitValidationState() === ERROR
            );
        };

        const handleNameChange = e => {
            nameChanged(e.target.value);
        };

        const handleDescChange = e => {
            descChanged(e.target.value);
        };

        const handlePriceChange = (e, masked) => {
            let val = parseInt(masked * 100);
            priceChanged(val);
        };

        const handleLimitChange = e => {
            limitChanged(Number(e.target.value));
        };

        const handleConsumableChange = () => {
            consumableChanged(!newSKU.consumable);
        };

        const handleLimitedChange = () => {
            limitedChanged(!newSKU.limited);
        };

        return <FlexChild>
            <Panel>
                <Panel.Heading>
                    <Panel.Title>
                        Create SKU
                        <div className="pull-right">
                            <Button onClick={toggleForm} bsSize='xsmall'><Glyphicon glyph="remove" /></Button>
                        </div>
                    </Panel.Title>
                    SKUs describe the items you will sell in your Shop
                </Panel.Heading>
                <Panel.Body>
                    <Form>

                        <FormGroup
                            controlId='nameField'
                            validationState={getNameValidationState()}>
                            <FormControl
                                disabled={creatingSKU}
                                type="text"
                                bsSize='large'
                                placeholder="SKU Name"
                                value={newSKU.name}
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
                                disabled={creatingSKU}
                                componentClass="textarea"
                                bsSize='large'
                                placeholder="Description"
                                value={newSKU.description}
                                onChange={handleDescChange}
                            />
                            <FormControl.Feedback />
                            {(getDescValidationState() === ERROR)
                                ? <HelpBlock>Enter at least 10 characters</HelpBlock>
                                : null}
                        </FormGroup>

                        <FormGroup
                            controlId='priceField'
                            validationState={getPriceValidationState()}>
                            <CurrencyInput placeholder={`Price (${shop.fiat})`} className='form-control input-lg' onChange={handlePriceChange}/>
                            <FormControl.Feedback />
                            {(getPriceValidationState() === ERROR)
                                ? <HelpBlock>Enter a non-negative numeric value</HelpBlock>
                                : null}
                        </FormGroup>

                        <FormGroup
                            controlId='checksGroup'>
                            <Checkbox
                                inline
                                onChange={handleConsumableChange}
                                checked={newSKU.consumable}>Consumable</Checkbox>
                            <Checkbox
                                inline
                                onChange={handleLimitedChange}
                                checked={newSKU.limited}>Limited</Checkbox>
                        </FormGroup>

                        {newSKU.limited
                            ? <FormGroup
                                    controlId='limitField'
                                    validationState={getLimitValidationState()}>
                                    <FormControl
                                         disabled={creatingSKU}
                                         type="text"
                                         bsSize='large'
                                         placeholder="Limit"
                                         onChange={handleLimitChange}
                                    />
                                    <FormControl.Feedback />
                                    {(getLimitValidationState() === ERROR)
                                        ? <HelpBlock>Enter a positive numeric value</HelpBlock>
                                        : null}
                                </FormGroup>
                            : null}

                        {creatingSKU
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

    // Toggle SKU form and select/deselect SKU Type
    handleToggleForm = () => {

        const {
            skuType,
            skuFormDisplayed,
            toggleForm,
            selectSKUType
        } = this.props;
        selectSKUType(skuFormDisplayed ? null: skuType.skuTypeId);
        toggleForm();

    };

    render() {

        const {
            skuType,
            selectedSKUTypeId,
            skuTypeFormDisplayed,
            skuFormDisplayed
        } = this.props;

        return  <Panel eventKey={skuType.skuTypeId}>
            <Panel.Heading>
                <Panel.Title>
                    {skuType.name}
                    <div className="pull-right">
                        {skuTypeFormDisplayed || skuFormDisplayed
                            ? null
                            : <Button onClick={this.handleToggleForm}>Add SKU</Button>}
                    </div>
                </Panel.Title>
                {skuType.description}
            </Panel.Heading>
            <PanelBodyFlexRow>
                {this.renderSKUList()}
                {skuFormDisplayed && selectedSKUTypeId === skuType.skuTypeId ? this.renderNewSKUForm() : null}
            </PanelBodyFlexRow>
        </Panel>;
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

export default connect(mapStateToProps, mapDispatchToProps)(SKUTypeView);

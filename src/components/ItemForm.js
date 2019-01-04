import React from "react";
import {Checkbox, FormGroup} from "react-bootstrap";
import {HollowDotsSpinner} from "react-epic-spinners";

import {
    KitButton,
    KitCurrencyInput,
    KitForm,
    KitFormControl,
    KitHelpBlock,
    KitSlidingWell,
    FlexChild
} from "./theme";
import {CONTRACTS} from "../constants";
import FormControl from "react-bootstrap/es/FormControl";

export default function ItemForm(props) {

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
    } = props;

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
        return (newSKU.name.length === 0) ? null : (newSKU.name.length >= 3) ? SUCCESS : ERROR;
    };

    const getDescValidationState = () => {
        return (newSKU.description.length === 0) ? null : (newSKU.description.length >= 5) ? SUCCESS : ERROR;
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
        <KitSlidingWell>
            <KitForm>

                <h2>Add Item</h2>

                <FormGroup
                    controlId='nameField'
                    validationState={getNameValidationState()}>
                    <KitFormControl
                        disabled={creatingSKU}
                        type="text"
                        bsSize='large'
                        placeholder="Name"
                        value={newSKU.name}
                        onChange={handleNameChange}
                    />
                    <FormControl.Feedback />
                    {(getNameValidationState() === ERROR)
                        ? <KitHelpBlock>Enter at least 3 characters</KitHelpBlock>
                        : null}
                </FormGroup>

                <FormGroup
                    controlId='descField'
                    validationState={getDescValidationState()}>
                    <KitFormControl
                        disabled={creatingSKU}
                        componentClass="textarea"
                        bsSize='large'
                        placeholder="Description"
                        value={newSKU.description}
                        onChange={handleDescChange}
                    />
                    <FormControl.Feedback />
                    {(getDescValidationState() === ERROR)
                        ? <KitHelpBlock>Enter at least 5 characters</KitHelpBlock>
                        : null}
                </FormGroup>

                <FormGroup
                    controlId='priceField'
                    validationState={getPriceValidationState()}>
                    <KitCurrencyInput placeholder={`Price (${shop.fiat})`}
                                      className='form-control input-lg'
                                      onChange={handlePriceChange}/>
                    <FormControl.Feedback />
                    {(getPriceValidationState() === ERROR)
                        ? <KitHelpBlock>Enter a non-negative numeric value</KitHelpBlock>
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
                        <KitFormControl
                            disabled={creatingSKU}
                            type="text"
                            bsSize='large'
                            placeholder="Limit"
                            onChange={handleLimitChange}
                        />
                        <FormControl.Feedback />
                        {(getLimitValidationState() === ERROR)
                            ? <KitHelpBlock>Enter a positive numeric value</KitHelpBlock>
                            : null}
                    </FormGroup>
                    : null}

                {creatingSKU
                    ? <HollowDotsSpinner color='black'/>
                    : <KitButton
                        bsSize='large'
                        disabled={isSubmitDisabled()}
                        onClick={handleSubmit}>Create</KitButton>}

                <span>&nbsp;</span>

                <KitButton
                    onClick={toggleForm}
                    bsSize='large'>Cancel</KitButton>


            </KitForm>
        </KitSlidingWell>
    </FlexChild>;
};

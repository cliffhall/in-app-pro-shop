import React from "react";
import {Checkbox, FormGroup} from "react-bootstrap";
import {HollowDotsSpinner} from "react-epic-spinners";

import {
    AppButton,
    AppCurrencyInput,
    AppForm,
    AppFormControl,
    AppHelpBlock,
    AppSlidingWell,
    FlexChild
} from "../styles";
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
        <AppSlidingWell>
            <AppForm>

                <h2>Add Item</h2>

                <FormGroup
                    controlId='nameField'
                    validationState={getNameValidationState()}>
                    <AppFormControl
                        disabled={creatingSKU}
                        type="text"
                        bsSize='large'
                        placeholder="Name"
                        value={newSKU.name}
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
                        disabled={creatingSKU}
                        componentClass="textarea"
                        bsSize='large'
                        placeholder="Description"
                        value={newSKU.description}
                        onChange={handleDescChange}
                    />
                    <FormControl.Feedback />
                    {(getDescValidationState() === ERROR)
                        ? <AppHelpBlock>Enter at least 5 characters</AppHelpBlock>
                        : null}
                </FormGroup>

                <FormGroup
                    controlId='priceField'
                    validationState={getPriceValidationState()}>
                    <AppCurrencyInput placeholder={`Price (${shop.fiat})`}
                                      className='form-control input-lg'
                                      onChange={handlePriceChange}/>
                    <FormControl.Feedback />
                    {(getPriceValidationState() === ERROR)
                        ? <AppHelpBlock>Enter a non-negative numeric value</AppHelpBlock>
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
                        <AppFormControl
                            disabled={creatingSKU}
                            type="text"
                            bsSize='large'
                            placeholder="Limit"
                            onChange={handleLimitChange}
                        />
                        <FormControl.Feedback />
                        {(getLimitValidationState() === ERROR)
                            ? <AppHelpBlock>Enter a positive numeric value</AppHelpBlock>
                            : null}
                    </FormGroup>
                    : null}

                {creatingSKU
                    ? <HollowDotsSpinner color='black'/>
                    : <AppButton
                        bsSize='large'
                        disabled={isSubmitDisabled()}
                        onClick={handleSubmit}>Create</AppButton>}

                <span>&nbsp;</span>

                <AppButton
                    onClick={toggleForm}
                    bsSize='large'>Cancel</AppButton>


            </AppForm>
        </AppSlidingWell>
    </FlexChild>;
};

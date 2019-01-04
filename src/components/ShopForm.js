import React from "react";
import {HollowDotsSpinner} from "react-epic-spinners";
import {ControlLabel, FormGroup, Glyphicon} from "react-bootstrap";

import {
    KitButton,
    KitForm,
    KitFormControl,
    KitHelpBlock,
    KitSlidingWell,
    KitToggleButton,
    KitToggleButtonGroup,
    FlexChild
} from "./theme";
import {CONTRACTS, CURRENCIES} from "../constants";
import FormControl from "react-bootstrap/es/FormControl";

export default function ShopForm(props) {

    const {
        drizzle,
        selectedAccount,
        name,
        description,
        fiat,
        createNewShop,
        nameChanged,
        descChanged,
        fiatChanged,
        creatingShop
    } = props;

    const SUCCESS = 'success';
    const ERROR = 'error';

    const handleSubmit = () => {
        createNewShop(drizzle.contracts[CONTRACTS.STOCK_ROOM], selectedAccount, name, description, fiat);
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

    const handleFiatChange = selection => {
        fiatChanged(selection);
    };

    return <FlexChild><KitSlidingWell><KitForm>
        <h2>Create&nbsp;a&nbsp;New&nbsp;Shop</h2>
        <FormGroup
            controlId='nameField'
            validationState={getNameValidationState()}>
            <KitFormControl
                disabled={creatingShop}
                type="text"
                bsSize='large'
                placeholder="Shop Name"
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
                disabled={creatingShop}
                componentClass="textarea"
                bsSize='large'
                placeholder="Description"
                onChange={handleDescChange}
            />
            <FormControl.Feedback />
            {(getDescValidationState() === ERROR)
                ? <KitHelpBlock>Enter at least 5 characters</KitHelpBlock>
                : null}
        </FormGroup>

        <FormGroup>
            <ControlLabel>Fiat Currency for Prices</ControlLabel>
            <br/>
            <KitToggleButtonGroup
                type="radio"
                name="shopCurrency"
                onChange={handleFiatChange}
                value={fiat}>
                {Object.values(CURRENCIES).map(sym => <KitToggleButton key={sym.symbol} value={sym.symbol}><Glyphicon glyph={sym.icon} /> - {sym.symbol}</KitToggleButton>)}
            </KitToggleButtonGroup>
        </FormGroup>
        {creatingShop
            ? <HollowDotsSpinner color='black'/>
            : <KitButton
                bsSize='large'
                disabled={isSubmitDisabled()}
                onClick={handleSubmit}>Create</KitButton>}

    </KitForm></KitSlidingWell></FlexChild>;
};

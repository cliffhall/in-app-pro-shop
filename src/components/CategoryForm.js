import React from "react";
import {FormGroup, FormControl} from "react-bootstrap";
import {HollowDotsSpinner} from "react-epic-spinners";

import {
    KitButton,
    KitForm,
    KitFormControl,
    KitHelpBlock,
    KitSlidingWell,
    FlexChild
} from "./theme";
import {CONTRACTS} from "../constants";

export default function CategoryForm(props) {

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
    } = props;

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
        <KitSlidingWell>
            <KitForm>
                <h2>
                    Add Category
                </h2>
                <FormGroup
                    controlId='nameField'
                    validationState={getNameValidationState()}>
                    <KitFormControl
                        disabled={creatingSKUType}
                        type="text"
                        bsSize='large'
                        placeholder="Name"
                        value={name}
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
                        disabled={creatingSKUType}
                        componentClass="textarea"
                        bsSize='large'
                        placeholder="Description"
                        value={description}
                        onChange={handleDescChange}
                    />
                    <FormControl.Feedback />
                    {(getDescValidationState() === ERROR)
                        ? <KitHelpBlock>Enter at least 5 characters</KitHelpBlock>
                        : null}
                </FormGroup>

                {creatingSKUType
                    ? <HollowDotsSpinner color='black'/>
                    : <KitButton
                        bsSize='large'
                        disabled={isSubmitDisabled()}
                        onClick={handleSubmit}>Create</KitButton>}

                <span>&nbsp;</span>

                <KitButton
                    onClick={toggleTypeForm}
                    bsSize='large'>Cancel</KitButton>

            </KitForm>
        </KitSlidingWell>
    </FlexChild>;
};

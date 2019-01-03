import React from "react";
import {FormGroup} from "react-bootstrap";
import {HollowDotsSpinner} from "react-epic-spinners";

import {
    AppButton,
    AppForm,
    AppFormControl,
    AppHelpBlock,
    AppSlidingWell,
    FlexChild
} from "../styles";
import {CONTRACTS} from "../constants";
import FormControl from "react-bootstrap/es/FormControl";

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
        <AppSlidingWell>
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
        </AppSlidingWell>
    </FlexChild>;
};

import { useState } from 'react';
import PropTypes from 'prop-types';

const notEmpty = val => !!val;

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    const aCopy = [...a].sort();
    const bCopy = [...b].sort();

    for (let i = 0; i < aCopy.length; ++i) {
        if (aCopy[i] !== bCopy[i]) return false;
    }
    return true;
}

function arrayDiff(a, b) {
    return a.filter(x => !b.includes(x));
}

function initialState(config) {
    return Object.keys(config).reduce((acc, key) => {
        acc[key] = { value: config[key].initialValue };
        return acc;
    }, {});
}

function getFormValues(formState) {
    return Object.keys(formState).reduce(
        (acc, name) => ({
            ...acc,
            [name]: formState[name].value,
        }),
        {}
    );
}

function getFormValidationState(formState) {
    console.log(formState);
    const validations = Object.keys(formState).map(name => formState[name].isInvalid);
    const isValid = !validations.includes(true);
    return isValid;
}

function getValidations(name, config) {
    // returns an array of objects with tests and errors
    const { isRequired, validations, displayName } = config[name];
    if (isRequired) {
        return [
            ...validations,
            {
                test: notEmpty,
                error: `${displayName} is required`,
            },
        ];
    }
    return validations;
}

function getValidatedFormState(formState, config) {
    // validates the current form state, returns the updated state.
    return Object.keys(formState).reduce(
        (acc, name) => ({
            ...acc,
            [name]: validateFormValue(name, formState[name].value, formState, config),
        }),
        {}
    );
}

function validateFormValue(name, value, formState, config) {
    // validates a field and return the next state object
    let errors = [];

    const validations = getValidations(name, config).map(({ test, error }) => {
        const isValid = test(value);
        if (!isValid) errors.push(error);
        return isValid;
    });

    const isValid = !validations.includes(false);
    const isInvalid = !isValid;

    errors = isInvalid ? errors : null;

    return {
        value,
        isInvalid,
        errors,
    };
}

function mergeFormStateValue(name, newValue, formState) {
    const curValue = formState[name];
    return {
        ...formState,
        [name]: { ...curValue, ...newValue },
    };
}

const createChangeHandler = (formState, setState, config) => event => {
    const { name, value, checked, type } = event.target;

    if (!name) {
        throw new Error('Inputs require a unique `name` attribute that corresponds to the schema.');
    }

    const changeValue = type === 'checkbox' ? checked : value;

    // validate on change when field is invalid and it's required
    if (formState[name].isInvalid && config[name].isRequired && notEmpty(changeValue)) {
        const validatedValue = validateFormValue(name, changeValue, formState, config);
        return setState(mergeFormStateValue(name, validatedValue, formState));
    }

    return setState(mergeFormStateValue(name, { value: changeValue }, formState));
};

const createBlurHandler = (formState, setState, config) => event => {
    const { name, value, checked, type } = event.target;
    const changeValue = type === 'checkbox' ? checked : value;
    const validatedValue = validateFormValue(name, changeValue, formState, config);
    return setState(mergeFormStateValue(name, validatedValue, formState));
};

const createFormStateInjector = (formState, setState) => injectedState => {
    console.log(injectedState);
    // @TODO: throw if key doesn't exist in form schema
    let newState = formState;
    Object.keys(injectedState).forEach(key => {
        const value = injectedState[key];
        newState = mergeFormStateValue(key, { value }, newState);
    });
    return setState(newState);
};

export default function useFormState(config) {
    const [formState, setState] = useState(initialState(config));

    console.log(getFormValidationState(formState));

    return {
        formState,
        formKeys: Object.keys(formState),
        formValues: getFormValues(formState),
        formSchema: config,
        isFormValid: getFormValidationState(formState),

        handleChange: createChangeHandler(formState, setState, config),
        handleBlur: createBlurHandler(formState, setState, config),

        clearFormState: () => setState(initialState(config)),
        validateForm: () => setState(getValidatedFormState(formState, config)),
        injectFormState: createFormStateInjector(formState, setState),
    };
}

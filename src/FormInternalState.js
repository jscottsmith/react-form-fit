import React, { Component } from 'react';
import PropTypes from 'prop-types';

const notEmpty = val => !!val;

class FormInternalState extends Component {
    static propTypes = {
        schema: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    get formKeys() {
        return Object.keys(this.props.schema);
    }

    get initialState() {
        return this.formKeys.reduce((acc, key) => {
            acc[key] = { value: this.props.schema[key].initialValue };
            return acc;
        }, {});
    }

    // Public methods

    handleChange = ({ target }) => {
        const { name, value, checked } = target;

        if (!name) {
            throw new Error(
                'Inputs used by `withFormState` require a unique `name` attribute that corresponds to the schema.'
            );
        }

        // handle checkboxes
        let changeValue = value;
        if (target.type === 'checkbox') {
            changeValue = checked;
        }

        const prevValue = this.state[name];
        const { isInvalid } = prevValue;

        // validate on change when field is invalid
        if (isInvalid) {
            const validatedValue = this._validateFormValue(name, changeValue);
            return this._setFormValue(name, validatedValue);
        }

        return this._setFormValue(name, { value: changeValue });
    };

    handleBlur = ({ target }) => {
        const { name, value, checked } = target;

        let changeValue = value;
        if (target.type === 'checkbox') {
            changeValue = checked;
        }

        const validatedValue = this._validateFormValue(name, changeValue);
        this._setFormValue(name, validatedValue);
    };

    validateForm = () => {
        // updates the form state with validations
        const newFormState = this._getValidatedFormState();
        this.setState(newFormState);

        return this._isFormValid(newFormState);
    };

    clearFormState = () => {
        this.setState(this.initialState);
    };

    injectFormState = injectedState => {
        // @TODO: throw if key doesn't exist in form schema
        Object.keys(injectedState).forEach(key => {
            const value = injectedState[key];
            this._setFormValue(key, { value });
        });
    };

    // Private internal methods

    _getValidatedFormState() {
        // validates the current form state, returns the updated state.
        return this.formKeys.reduce(
            (acc, name) => ({
                ...acc,
                [name]: this._validateFormValue(name, this.state[name].value),
            }),
            {}
        );
    }

    _getFormValues() {
        return this.formKeys.reduce(
            (acc, name) => ({
                ...acc,
                [name]: this.state[name].value,
            }),
            {}
        );
    }

    _isFormValid(state) {
        const validations = this.formKeys.map(name => state[name].isInvalid);

        const isValid = !validations.includes(true);

        return isValid;
    }

    _setFormValue(name, value) {
        // merge with incoming with previous values
        const prevValue = this.state[name];
        const nextState = {
            [name]: { ...prevValue, ...value },
        };
        this.setState(nextState);
    }

    _getValidations(name) {
        // returns an array of objects with tests and errors
        const { isRequired, validations, displayName } = this.props.schema[name];
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

    _validateFormValue(name, value) {
        // don't validate if empty and not required
        const { isRequired } = this.props.schema[name];
        const isEmpty = !notEmpty(value);

        if (isEmpty && !isRequired) {
            return {
                value,
                errors: null,
                isInvalid: false,
            };
        }

        // validates a field and return the next state object
        let errors = [];

        const validations = this._getValidations(name).map(({ test, error }) => {
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

    render() {
        const isFormValid = this._isFormValid(this._getValidatedFormState());
        const formValues = this._getFormValues();

        return this.props.children({
            clearFormState: this.clearFormState,
            handleBlur: this.handleBlur,
            handleChange: this.handleChange,
            injectFormState: this.injectFormState,
            validateForm: this.validateForm,
            formSchema: this.props.schema,
            formState: this.state,
            formValues,
            isFormValid,
        });
    }
}

export default FormInternalState;

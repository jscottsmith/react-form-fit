import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import CheckboxInput from './CheckboxInput';
import withFormState from '../../src/withFormState';

// schemas
import basicValidation from '../schemas/basicValidation';
import noValidation from '../schemas/noValidation';

import './Form.scss';

class Form extends Component {
    static propTypes = {
        clearFormState: PropTypes.func.isRequired,
        formSchema: PropTypes.object.isRequired,
        formState: PropTypes.object.isRequired,
        formValues: PropTypes.object.isRequired,
        handleBlur: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        injectFormState: PropTypes.func.isRequired,
        isFormValid: PropTypes.bool.isRequired,
        validateForm: PropTypes.func.isRequired,
    };

    componentDidMount = () => {
        // NOTE: this is simulating an API call that might return
        // data needed as initial form state.
        // setTimeout(this.updateFormState, 1000);
    };

    updateFormState = () => {
        // State to be injected after the timeout
        this.props.injectFormState({
            name: 'J Scott Smith',
            age: 32,
        });
    };

    handleSubmit = () => {
        if (this.props.validateForm()) {
            this.props.handleSubmit('VALID FORM', this.props.formValues);
        } else {
            this.props.handleSubmit('INVALID FORM', this.props.formValues);
        }
    };

    handleDefaults = () => {
        this.props.injectFormState({
            name: 'John Doe',
            age: 21,
            toc: true,
        });
    };

    render() {
        // with form state HOC props
        const {
            handleChange,
            handleBlur,
            formState,
            formSchema,
            isFormValid,
            hasInject,
        } = this.props;

        return (
            <div className="form">
                <TextInput
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={formSchema.name.displayName}
                    value={formState.name.value}
                    errors={formState.name.errors}
                    isInvalid={formState.name.isInvalid}
                />
                <NumberInput
                    name="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={formSchema.age.displayName}
                    value={formState.age.value}
                    errors={formState.age.errors}
                    isInvalid={formState.age.isInvalid}
                />
                <CheckboxInput
                    name="toc"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label={formSchema.toc.displayName}
                    checked={formState.toc.value}
                    errors={formState.toc.errors}
                    isInvalid={formState.toc.isInvalid}
                />

                <button disabled={!isFormValid} onClick={this.handleSubmit}>
                    Submit
                </button>
                {hasInject && <button onClick={this.handleDefaults}>Set Defaults</button>}
            </div>
        );
    }
}

// exporting withFormState(wrapped, schema)
// Passes the <Form> as the wrapped component and a schema to validate the form against
export const BasicForm = withFormState(Form, basicValidation);

export const NoValidationForm = withFormState(Form, noValidation);

export const InjectForm = withFormState(Form, basicValidation);

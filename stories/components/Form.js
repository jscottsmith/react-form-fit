import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import basicFormSchema from '../schemas/formSchema';
import withFormState from '../../src/withFormState';

import './Form.scss';

class Form extends Component {
    static propTypes = {
        handleChange: PropTypes.func.isRequired,
        handleBlur: PropTypes.func.isRequired,
        validateForm: PropTypes.func.isRequired,
        clearFormState: PropTypes.func.isRequired,
        formState: PropTypes.object.isRequired,
        formSchema: PropTypes.object.isRequired,
        isFormValid: PropTypes.bool.isRequired,
    };

    handleSubmit = () => {
        if (this.props.validateForm()) {
            this.props.handleSubmit('VALID FORM', this.props.formState);
        } else {
            this.props.handleSubmit('INVALID FORM', this.props.formState);
        }
    };

    render() {
        const { handleChange, handleBlur, formState, formSchema, isFormValid } = this.props;

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
                <button disabled={!isFormValid} onClick={this.handleSubmit}>
                    Submit
                </button>
            </div>
        );
    }
}

export default withFormState(Form, basicFormSchema);

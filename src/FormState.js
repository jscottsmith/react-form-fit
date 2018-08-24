import React from 'react';
import PropTypes from 'prop-types';
import FormInternalState from './FormInternalState';
import FormSchema from './FormSchema';

const FormState = ({ schema, children }) => (
    <FormSchema schema={schema}>
        {(_schema, formKeys) => (
            <FormInternalState schema={_schema} formKeys={formKeys}>
                {props => children(props)}
            </FormInternalState>
        )}
    </FormSchema>
);

FormState.propTypes = {
    children: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
};

export default FormState;

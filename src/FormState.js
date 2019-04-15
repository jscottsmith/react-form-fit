import React from 'react';
import PropTypes from 'prop-types';
import FormInternalState from './FormInternalState';
import { createSchema } from './createSchema';

const FormState = ({ schema, children }) => {
    return (
        <FormInternalState schema={createSchema(schema)} formKeys={Object.keys(schema)}>
            {props => children(props)}
        </FormInternalState>
    );
};

FormState.propTypes = {
    children: PropTypes.func.isRequired,
    schema: PropTypes.object.isRequired,
};

export default FormState;

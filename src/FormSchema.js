import React, { Component } from 'react';
import PropTypes from 'prop-types';

// creates and validates a form schema for use with the withFormState HOC

export default class FormSchema extends Component {
    static propTypes = {
        schema: PropTypes.object.isRequired,
        children: PropTypes.func.isRequired,
    };

    defaultValues = {
        initialValue: '',
        isRequired: true,
        validations: [],
    };

    validKeyShape = PropTypes.exact({
        displayName: PropTypes.string.isRequired,
        initialValue: PropTypes.any.isRequired,
        isRequired: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        validations: PropTypes.arrayOf(
            PropTypes.exact({
                test: PropTypes.func.isRequired,
                error: PropTypes.string.isRequired,
            })
        ),
    });

    get schemaKeys() {
        return Object.keys(this.props.schema);
    }

    _validateSchema(schema) {
        Object.keys(schema).forEach(key => {
            const validShape = { [key]: this.validKeyShape };
            PropTypes.checkPropTypes(validShape, schema, 'key', 'FormSchema');
        });
    }

    _getMergedDefaults(schema) {
        const merged = Object.keys(schema).reduce((acc, key) => {
            acc[key] = {
                name: key,
                ...this.defaultValues,
                ...schema[key],
            };
            return acc;
        }, {});
        return merged;
    }

    _create(schema) {
        const merged = this._getMergedDefaults(schema);
        this._validateSchema(merged);
        return merged;
    }

    render() {
        const { schema, children } = this.props;
        return children(this._create(schema), this.schemaKeys);
    }
}

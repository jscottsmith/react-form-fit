import PropTypes from 'prop-types';

// creates and validates a form schema for use with the withFormState HOC

export default class FormSchema {
    static defaultValues = {
        initialValue: '',
        isRequired: true,
        validations: [],
    };

    static validKeyShape = PropTypes.exact({
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

    static validateSchema(schema) {
        Object.keys(schema).forEach(key => {
            const validShape = { [key]: FormSchema.validKeyShape };
            PropTypes.checkPropTypes(validShape, schema, 'key', 'FormSchema');
        });
    }

    static mergeDefaults(schema) {
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

    static create(schema) {
        const merged = this.mergeDefaults(schema);
        this.validateSchema(merged);
        return merged;
    }
}

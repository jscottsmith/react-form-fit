import PropTypes from 'prop-types';

const DEFAULT_KEY_VALUES = {
    initialValue: '',
    isRequired: true,
    validations: [],
};

const VALID_KEY_SHAPE = PropTypes.exact({
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

function _getMergedDefaults(config) {
    const merged = Object.keys(config).reduce((acc, key) => {
        acc[key] = {
            name: key,
            ...DEFAULT_KEY_VALUES,
            ...config[key],
        };
        return acc;
    }, {});
    return merged;
}

function _validateSchema(schema) {
    Object.keys(schema).forEach(key => {
        const validShape = { [key]: VALID_KEY_SHAPE };
        PropTypes.checkPropTypes(validShape, schema, 'key', 'FormSchema');
    });
}

export function createSchema(config) {
    const merged = _getMergedDefaults(config);
    _validateSchema(merged);
    return merged;
}

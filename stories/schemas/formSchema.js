// const isNumber = val => typeof val === 'number';
// const isString = val => typeof val === 'string';
const legnthGreaterThan = min => val => val.length > min;
// const greaterThan = min => val => val > min;
const greaterOrEqualThan = min => val => val >= min;
const lessThan = min => val => val < min;
// const lessOrEqualThan = max => val => val <= max;

// NOTE:
// This is the config that describes our form state
// each key will represent a unique form input
// and can have it's own validation requirements.

const formSchema = {
    // 'name' key defines our first input
    name: {
        displayName: 'Full Name',
        // by default all fields are required

        // isRequired: false,
        validations: [
            {
                test: legnthGreaterThan(2),
                error: "You sure that's your full name?",
            },
        ],
    },

    // another input with more advanced configuration
    age: {
        displayName: 'Age',
        // initialValue: 18,
        validations: [
            {
                test: greaterOrEqualThan(18),
                error: 'Must be 18 or older.',
            },
            {
                test: lessThan(120),
                error: 'Seriously...',
            },
        ],
    },
};

export default formSchema;

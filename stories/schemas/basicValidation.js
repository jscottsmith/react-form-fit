import { lengthGreaterThan, greaterOrEqualThan, lessThan } from '../validations';

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
                test: lengthGreaterThan(2),
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

    toc: {
        displayName: 'Agree to Terms',
    },
};

export default formSchema;

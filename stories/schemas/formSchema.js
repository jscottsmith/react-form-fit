const formSchema = {
    name: {
        displayName: 'First Name',
        // isRequired: false,
    },
    age: {
        displayName: 'Age',
        // initialValue: 18,
        validations: [
            {
                test: val => val >= 18,
                error: 'Must be 18 or older.',
            },
            {
                test: val => val <= 120,
                error: 'Seriously...',
            },
        ],
    },
};

export default formSchema;

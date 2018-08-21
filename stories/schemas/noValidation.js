const formSchema = {
    // 'name' key defines our first input
    name: {
        displayName: 'Full Name',
        // by default all fields are required
        // but you can not require it by defining:
        isRequired: false,
    },

    // another input with more advanced configuration
    age: {
        displayName: 'Age',
        isRequired: false,
    },
};

export default formSchema;

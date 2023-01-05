module.exports = {
    components: {
        schemas: {
            // Id
            id: {
                type: "number", // data-type
                description: "User sequence Id", // desc
                example: 1, // example of an id
            },
            // User model
            User: {
                type: "object", // data type
                properties: {
                    id: {
                        type: "number", // data-type
                        description: "User sequence Id", // desc
                        example: 1, // example of an id
                    }, name: {
                        type: "string", // data-type
                        description: "User Name", // desc
                        example: "Alejandro", // example of a title
                    }, email: {
                        type: "string", // data-type
                        description: "User email", // desc
                        example: "alejovic@gmail.com", // example of a completed value
                    },
                },
            }, // User input model
            UserInput: {
                type: "object", // data type
                properties: {
                    name: {
                        type: "string", // data-type
                        description: "User Name", // desc
                        example: "Alejandro", // example of a title
                    }, email: {
                        type: "string", // data-type
                        description: "User email", // desc
                        example: "alejovic@gmail.com", // example of a completed value
                    },
                },
            }, // error model
            Error: {
                type: "object", // data-type
                properties: {
                    message: {
                        type: "string", // data-type
                        description: "Error message", // desc
                        example: "Not found", // example of an error message
                    }, internal_code: {
                        type: "string", // data type
                        description: "Error internal code", // desc
                        example: "Invalid parameters", // example of an error internal code
                    },
                },
            },
        },
    },
};

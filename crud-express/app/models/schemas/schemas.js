const Joi = require('joi');

const schemas = {
    user: Joi.object().keys({
        name: Joi.string()
            .min(5)
            .required(),

        email: Joi.string()
            .min(5)
            .email()
            .required(),

        image: Joi.string()
            //.uri()
            .optional(),

    })
    // define other schemas below...
};

module.exports = schemas;

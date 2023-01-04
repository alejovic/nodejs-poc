const logger = require('../../config/logger');
const schema = require('../validators/schemas/schemas.joi')

exports.validateUser = (user) => {
    logger.debug('user.joi.validator -> start.');
    return new Promise((resolve, reject) => {
        const validation = schema.user.validate(user);
        logger.debug('user.joi.validator result -> ' + validation.error);

        if (validation.error) {
            reject({
                status: 'error',
                message: validation.error,
            });
        }
        resolve({
            status: 'success',
        });
    });
};

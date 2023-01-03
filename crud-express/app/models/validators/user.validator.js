const logger = require('../../config/logger');
const schema = require('../schemas/schemas')

exports.validateUser = (user, result) => {
    logger.debug('validating user -> start.');
    const validation = schema.user.validate(user);
    logger.debug('validation result -> ' + validation.error);

    if (validation.error) {
        result ( {
            status: 'error',
            message: validation.error,
        });
        return;
    }
};

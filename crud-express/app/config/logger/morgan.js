const morgan = require('morgan');
const logger = require('.');
const config = require("../config");

module.exports.default = () => {
    let level = config.env === 'development' ? 'dev' : 'prod';
    logger.debug('morgan level -> ' + level)
    return morgan('tiny');
};

module.exports.config = (level, options) => {
    logger.debug('morgan level -> ' + level)
    return morgan(level, options);
};

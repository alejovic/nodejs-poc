const config = require('../config.js');
const pino = require('pino');

// Create a logging instance
const logger = pino({
    level: config.env === 'development' ? 'debug' : 'info'
});


module.exports = logger;

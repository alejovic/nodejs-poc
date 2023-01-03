const config = require('../config.js');
const winston = require('winston');

const options = {
    file: {
        level: 'info',
        filename: './logs/app.log',
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
    },
    console: {
        level: 'debug',
        stderrLevels: ['error'],
        handleExceptions: true,
    },
};

const transports = [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
]

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, {message: info.stack});
    }
    return info;
});

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    enumerateErrorFormat(),
    // Add the message timestamp with the preferred format
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    // Tell Winston that the logs must be colored
    //winston.format.colorize({all: true}),
    config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),

    // Define the format of the message showing the timestamp, the level and the message
    // winston.format.printf(
    //     (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    // ),
    winston.format.printf(({timestamp, level, message}) => `${timestamp}  ${level}: ${message}`)
);

const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format,
    transports,
});

module.exports = logger;

const logger = require('../../config/logger');
const mysql = require('mysql');
const { user, host, database, password, port} = require('../../config/dbConfig');

// connection configurations
const client = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

// connect to database
client.connect(function (err) {
    if (err) throw err
    logger.debug('You are now connected with mysql database...')
})

module.exports = client;

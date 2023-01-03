//
// common practice : there is no a 'separation of concerns'
// controller is being mixied with DAL responsabilities
// @see approach: user.controller.option2.js
//
const logger = require('../config/logger');
const {Client} = require('pg');

const config = require('../config/config.js');

const client = new Client({
    user: config.get('db.user'),
    host: config.get('db.host'),
    database: config.get('db.name'),
    password: config.get('db.password'),
    port: config.get('db.port')
});

client.connect(function (err) {
    if (err) throw err
    logger.debug('bad practice --> You are now connected with postgres database...')
})

exports.findAll = (req, res) => {
    logger.debug('user.controller.option1.findAll -> start');
    let sql = 'SELECT * FROM users';
    client.query(sql,
        function (error, data) {
            if (error) throw error;
            res.end(JSON.stringify({
                status: 'success',
                payload: data.rows
            }));
        });
};

exports.findById = (req, res) => {
    logger.debug('user.controller.option1.findById -> start');
    let sql = 'SELECT * FROM users WHERE id=$1';
    client.query(sql,
        [req.params.id],
        function (error, data) {
            if (error) throw error;
            if (data.rowCount === 0) {
                res.end(JSON.stringify({
                    status: 'error',
                    message: 'not found'
                }));
                return;
            }
            res.end(JSON.stringify(data.rows));
        });
};

exports.create = (req, res) => {
    logger.debug('user.controller.option1.create -> start');
    // Validate request
    if (!req.body.email) {
        return res.status(400).send({
            status: 'error',
            message: 'Users email can not be empty'
        });
    }

    const user = req.body;
    const params = [user.name, user.email];
    logger.debug(params);
    let sql = 'INSERT INTO users(name, email) VALUES ($1,$2)';
    client.query(sql, params,
        function (error, data) {
            if (error) throw error;
            logger.debug(data);
            return res.send({
                status: "success",
                message: "the user has been created."
            });
        });
};

exports.update = (req, res) => {
    logger.debug('user.controller.option1.update -> start');
    // Validate Request
    if (!req.body.email) {
        return res.status(400).send({
            status: 'error',
            message: 'Todo email can not be empty'
        });
    }

    let sql = 'UPDATE users SET name=$1, email=$2 where id=$3';
    client.query(sql,
        [req.body.name, req.body.email, req.params.id],
        function (error, data) {
            if (error) throw error;
            logger.debug(data);
            res.end(JSON.stringify({
                status: "success",
                message: "the user has been updated."
            }));
        });
};

exports.remove = (req, res) => {
    logger.debug('user.controller.option1.remove -> start');
    logger.debug(req.body);
    let sql = 'DELETE FROM users WHERE id=$1';
    client.query(sql,
        [req.body.id], function (error, data) {
            if (error) throw error;
            logger.debug(data);
            res.end(JSON.stringify({
                status: "success",
                message: "the user has been deleted."
            }));
        });
};


//
// common practice : there is no a 'separation of concerns'
// controller is being mixied with DAL responsabilities
// @see approach: user.controller.option2.js
//

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
    console.log('bad practice --> You are now connected with postgres database...')
})

exports.findAll = (req, res) => {
    console.log('user.controller.option1.findAll -> start');
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
    console.log('user.controller.option1.findById -> start');
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
    console.log('user.controller.option1.create -> start');
    // Validate request
    if (!req.body.email) {
        return res.status(400).send({
            status: 'error',
            message: 'Users email can not be empty'
        });
    }

    const user = req.body;
    const params = [user.name, user.email];
    console.log(params);
    let sql = 'INSERT INTO users(name, email) VALUES ($1,$2)';
    client.query(sql, params,
        function (error, data) {
            if (error) throw error;
            console.debug(data);
            return res.send({
                status: "success",
                message: "the user has been created."
            });
        });
};

exports.update = (req, res) => {
    console.log('user.controller.option1.update -> start');
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
            console.debug(data);
            res.end(JSON.stringify({
                status: "success",
                message: "the user has been updated."
            }));
        });
};

exports.remove = (req, res) => {
    console.log('user.controller.option1.remove -> start');
    console.log(req.body);
    let sql = 'DELETE FROM users WHERE id=$1';
    client.query(sql,
        [req.body.id], function (error, data) {
            if (error) throw error;
            console.debug(data);
            res.end(JSON.stringify({
                status: "success",
                message: "the user has been deleted."
            }));
        });
};


//
// common practice : there is no a 'separation of concerns'
// controller is being mixied with DAL responsabilities
// @see approach: user.controller.option2.js
//

const { Client } = require('pg');

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
    console.log('You are now connected with postgres database...')
})

exports.findAll = (req, res) => {
    console.log('user.controller.option1.findAll -> start');
    let sql = 'SELECT * FROM users';
    client.query(sql,
        function (error, data, fields) {
            if (error) throw error;
            res.end(JSON.stringify(data.rows));
        });
};

exports.findById = (req, res) => {
    console.log('user.controller.option1.findById -> start');
    let sql = 'SELECT * FROM users where id=?';
    client.query(sql,
        [req.params.id],
        function (error, data, fields) {
            if (error) throw error;
            res.end(JSON.stringify(data.rows));
        });
};

exports.create = (req, res) => {
    console.log('user.controller.option1.create -> start');
    // Validate request
    if (!req.body.email) {
        return res.status(400).send({
            message: 'Users email can not be empty'
        });
    }

    var params = req.body;
    console.log(params);
    let sql = 'INSERT INTO users SET ?';
    client.query(sql, params,
        function (error, data, fields) {
            if (error) throw error;
            return res.send({
                status: 'success',
                data: data,
                message: 'New user has been created successfully.'
            });
        });
};

exports.update = (req, res) => {
    console.log('user.controller.option1.update -> start');
    // Validate Request
    if (!req.body.email) {
        return res.status(400).send({
            message: 'Todo email can not be empty'
        });
    }

    console.log(req.params.id);
    console.log(req.body.email);
    let sql = 'UPDATE users SET name=?, email=? where id=?';
    client.query(sql,
        [req.body.name, req.body.email, req.params.id],
        function (error, data, fields) {
            if (error) throw error;
            res.end(JSON.stringify(data));
        });
};

exports.remove = (req, res) => {
    console.log('user.controller.option1.remove -> start');
    console.log(req.body);
    let sql = 'DELETE FROM users WHERE id=?';
    client.query(sql,
        [req.body.id], function (error, data, fields) {
            if (error) throw error;
            res.end('Record has been deleted!');
        });
};


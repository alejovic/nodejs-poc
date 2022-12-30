const {Client} = require('pg');

const config = require('../../config/config.js');

const client = new Client({
    user: config.get('db.user'),
    host: config.get('db.host'),
    database: config.get('db.name'),
    password: config.get('db.password'),
    port: config.get('db.port')
});

client.connect(function (err) {
    if (err) throw err
    console.log('Connected to pgSQL -> ' + client.host + ':' + client.port);
})

module.exports = client;

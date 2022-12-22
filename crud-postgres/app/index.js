const express = require('express');
const bodyParser = require('body-parser');


// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// define a simple route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world crud postgres -> nodejs, express and pg!'});
});


// option: simple projects - no best practice
// const service = require('./services/clients');
// app.get('/api/clients', service.findAll);


// A best practice is to abstract routes into a module that has the job of mapping paths to controller methods.
// using the api-routes/index.js
app.use('/api/clients', require('./api-routes/'))

// option #1 /api/route-1/clients
app.use('/api/route-1/clients', require('./api-routes/routes.option1'))

// option #2 /api/route-2/clients
app.use('/api/route-2/clients', require('./api-routes/routes.option2'));

// option #3 /api/route-3/clients
require('./api-routes/routes.option3') (app);

module.exports = app;
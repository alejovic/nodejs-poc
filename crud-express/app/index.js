const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// cors
const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// define a simple route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world crud postgres -> nodejs, express and pg!'});
});

// morgan -  log HTTP requests
app.use(require('./config/logger/morgan'));

// option: simple projects - no best practice
// const service = require('./services/clients');
// app.get('/api/clients', service.findAll);


// A best practice is to abstract routes into a module that has the job of mapping paths to controller methods.
// using the api-routes/index.js
app.use('/api/clients', require('./api-routes'))

// option #1 /api/option1/clients
app.use('/api/option1/clients', require('./api-routes/routes.option1').Router());

// option #2 /api/option2/clients
app.use('/api/option2/clients', require('./api-routes/routes.option2'));

// option #3 /api/option3/clients
require('./api-routes/routes.option3') (app);

// option #4 /api/nosql/clients
app.use('/api/nosql/clients', require('./api-routes/routes.nosql'));

// option #5 /api/sequelize/clients
app.use('/api/sequelize/clients', require('./api-routes/routes.sequelize'));

module.exports = app;

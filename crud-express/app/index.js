const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// cors
const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

//swagger
const swaggerUi = require('swagger-ui-express');

console.log(process.cwd());
const customCss = fs.readFileSync((process.cwd() + "/app/api-doc/swagger.css"), 'utf8');
const swaggerDocument = require('./api-doc/swagger.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

const swaggerFolder = require('./api-doc');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFolder));


// define a simple route
app.get('/', (req, res) => {
    res.json({
        message: 'Hello world crud postgres -> nodejs, express and pg!'
    });
});

// morgan -  log HTTP requests
app.use(require('./config/logger/morgan'));

// option: simple projects - no best practice
// const service = require('./services/users');
// app.get('/api/users', service.findAll);


// A best practice is to abstract routes into a module that has the job of mapping paths to controller methods.
// using the api-routes/index.js
app.use('/api/users', require('./api-routes'))

// option #1 /api/option1/clie  nts
app.use('/api/option1/users', require('./api-routes/routes.option1').Router());

// option #2 /api/option2/users
app.use('/api/option2/users', require('./api-routes/routes.option2'));

// option #3 /api/option3/users
require('./api-routes/routes.option3')(app);

// option #4 /api/nosql/users
app.use('/api/nosql/users', require('./api-routes/routes.nosql'));

// option #5 /api/sequelize/users
app.use('/api/sequelize/users', require('./api-routes/routes.sequelize'));

module.exports = app;

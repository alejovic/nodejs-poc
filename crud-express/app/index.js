const express = require('express');
const logger = require("./config/logger");
const fs = require('fs');

// create express app
const app = express();

const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

// cors
// const cors = require('cors');
// const corsOptions = {
//     origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

// morgan -  log HTTP requests
app.use(require('./config/logger/morgan'));

//swagger
const swaggerUi = require('swagger-ui-express');

console.log(process.cwd());
const customCss = fs.readFileSync((process.cwd() + "/app/api-doc/swagger.css"), 'utf8');
const swaggerDocument = require('./api-doc/swagger.json');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));

const swaggerFolder = require('./api-doc');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFolder));

// This is the basic express session({..}) initialization.
const session = require('express-session');
const sessionStore = new session.MemoryStore();
app.use(session({
    secret: 'crud-express-poc',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 5,
        secure: true
    },
}))


// passport
const passport = require('passport');
// strategy
require('./config/auth/strategies/local');

// init passport on every route call.
app.use(passport.initialize(undefined));
// allow passport to use "express-session".
app.use(passport.session(undefined));

// auth route option #1
// app.use(passport.authenticate('custom-login'),
//     (req, res, next) => {
//         console.log(req.session);
//         console.log(req.user);
//         next();
//     });
// app.use('/auth/v1', require('./api-routes/auth/auth.router.option1.js'));


// auth route option #2
const authentication = require('./api-routes/auth/auth.router.option2');
const isAuth = authentication.isAuth;
authentication.authenticate(app);

// define a protected route
app.get('/protected-route', isAuth,
    (req, res) => {
        logger.debug(`the user isAuthenticated -> ${req.isAuthenticated()}`);
        return res.status(200).send({
            message: 'Hello world crud postgres -> nodejs, express and pg!'
        })
    }
);

// define a simple route
app.get('/simple',
    (req, res) => {
        return res.status(200).send({
            message: 'Hello world crud postgres -> nodejs, express and pg!'
        })
    }
);


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

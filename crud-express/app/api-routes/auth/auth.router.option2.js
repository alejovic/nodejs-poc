const passport = require('passport');
const logger = require('../../config/logger');
const router = require('express').Router();

module.exports = function (app) {

    router.post('/login',
        (req, res, next) => {
            logger.debug(`[Authentication] a new Request has been received -> ${JSON.stringify(req.body)}`);
            authenticate(req, res, next);
        });

    app.use('/auth', router);

    app.use('',(req, res, next) => {
        console.log(req.session);
        console.log(req.user);
        logger.debug(`[Authentication] a new Request has been received -> ${JSON.stringify(req.body)}`);
        authenticate(req, res, next);
    });

    //app.use(authenticate(req, res, next));


};

function authenticate(req, res, next) {
    logger.debug(`req.body.username -> ${req.body.username}`);
    logger.debug(`req.body.password -> ${req.body.password}`);

    logger.debug(`req._passport -> ${JSON.stringify(req._passport)}`);
    logger.debug(`req.user -> ${JSON.stringify(req.user)}`);

    logger.debug("Session and Cookie");
    logger.debug(`req.session.passport -> ${JSON.stringify(req.session.passport)}`);
    logger.debug(`req.session.id -> ${req.session.id}`);
    logger.debug(`req.session.cookie -> ${JSON.stringify(req.session.cookie)}`);

    passport.authenticate('custom-login',
        {},
        (err, user, info) => {

            logger.debug(`[Authentication] the user isAuthenticated -> ${req.isAuthenticated()}`);
            if (err) return next(err);

            if (!user) {
                return res.sendStatus(400).send(info);
            }

            logger.debug(`[Authentication] the user ${user.username} has been validated. `);
            logger.debug(`[Authentication] response is sent back...${info}`);

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                logger.debug(`[Authentication] the user isAuthenticated -> ${req.isAuthenticated()}`);

                return res.sendStatus(200).send(info);
            });

            if (!req.isAuthenticated()) {
                logger.warn(`[Authentication] the user isAuthenticated -> ${req.isAuthenticated()}`);
                return res.sendStatus(401).send(info);
            }
        })(req, res, next);
};

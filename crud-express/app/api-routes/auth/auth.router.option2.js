const passport = require('passport');
const logger = require('../../config/logger');
const router = require('express').Router();

exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send({
            message: 'Not authenticated to check this resource!'
        })
    };
};

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).send({
            message: 'Need to be an admin user to check this resource!'
        })
    };
}

exports.authenticate = function (app) {

    // app.use(authenticate,
    //     (req, res, next) => {
    //         // console.log(req.session);
    //         // console.log(req.user);
    //         next();
    //     });

    router.post('/login', authenticate,
        (req, res, next) => {
            logger.debug(`[Authentication] a new Request has been received -> ${JSON.stringify(req.body)}`);
            // console.log(req.session);
            // console.log(req.user);
            if (req.user) {
                return res.status(200).send({
                    message: 'login successful!'
                })
            }
            return res.status(403).send({
                message: 'Not authenticated!'
            });
        });

    router.post('/protected-route', authenticate, isAdmin,
        (req, res) => {
            logger.debug(`the user isAuthenticated -> ${req.isAuthenticated()}`);
            return res.status(200).send({
                message: 'Hello world crud postgres -> nodejs, express and pg!'
            })
        }
    );

    app.use('/auth/v2', router);

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
        {session: true},
        (err, user, info) => {

            logger.debug(`[Authentication] the user isAuthenticated -> ${req.isAuthenticated()}`);
            if (err) return next(err);

            if (!user) {
                return res.status(401).json({message: 'User was not found (401)'});
            }

            if (info) {
                return res.status(401).json({message: info.message});
            }

            logger.debug(`[Authentication] the user ${user.username} has been validated. `);
            logger.debug(`[Authentication] response is sent back...`);

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                logger.debug(`[Authentication] the user isAuthenticated -> ${req.isAuthenticated()}`);
                logger.debug(`[Authentication] the session.passport is -> ${JSON.stringify(req.session.passport)}`);
                logger.debug(`[Authentication] the user.username is -> ${req.user.username}`);
            });

            if (!req.isAuthenticated()) {
                logger.warn(`[Authentication] the user isAuthenticated -> ${req.isAuthenticated()}`);
                return res.status(401).json({message: 'User is not authenticated (401)'});
            }

            req.user = user;
            next();

        })(req, res, next);
};

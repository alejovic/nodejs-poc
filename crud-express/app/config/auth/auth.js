const {Router} = require('express');
const passport = require('passport');
const logger = require('../logger');

const router = Router();

router.post('/login',
    (req, res, next) => {
        logger.debug(`[Authentication] a new Request has been received -> ${JSON.stringify(req.body)}`);
        passport.authenticate('local',
            {session: true},
            (err, user, info) => {
                if (err) return next(err);

                if (!user) {
                    return res.status(400).send(info);
                }

                logger.debug(`[Authentication] the user ${user.username} has been validated.`);
                logger.debug('[Authentication] response is sent back...');
                res.status(200).send(info);
            })(req, res, next);
    });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//     logger.debug('response is sent back...');
//     res.sendStatus(200);
// });

module.exports = router;

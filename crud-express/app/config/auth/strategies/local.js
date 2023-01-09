const LocalStrategy = require('passport-local');
const passport = require('passport');
const logger = require('../../logger');

// 1. If the user not found in DB,
//     done (null, false)
// 2. If the user found in DB, but password does not match,
//     done (null, false)
// 3. If user found in DB and password match,
//     done (null, {authenticated_user})

// callback
const authenticateUser = async (username, password, done) => {
    try {
        const result = await dummyAuthentication(username, password);
        logger.debug('[LocalStrategy Authentication]: ' + JSON.stringify(result));
        if (result.status === 'success') {
            done(null, result.user);
            return;
        }
        done(null, false, result);

    } catch (err) {
        done(null, false, {
            status: 'error',
            message: err,
        });
    } finally {
        logger.debug('[LocalStrategy Authentication]: Done.');
    }
};

const strategy = new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
    authenticateUser
);

passport.use('custom-login', strategy);

// WHAT DOES SERIALIZE USER MEAN?
// 1. "express-session" creates a "req.session" object, when it is invoked via app.use(session({..}))
// 2. "passport" then adds an additional object "req.session.passport" to this "req.session".
// 3. All the serializeUser() function does is,
//     receives the "authenticated user" object from the "Strategy" framework, and attach the authenticated user to "req.session.passport.user.{..}"
// In above case we receive {id: 123, name: "Kyle"} from the done() in the authUser function in the Strategy framework,
//     so this will be attached as
// req.session.passport.user.{id: 123, name: "Kyle"}
//
// 3. So in effect during "serializeUser", the PassportJS library adds the authenticated user to end of the "req.session.passport" object.
//     This is what is meant by serialization.
//     This allows the authenticated user to be "attached" to a unique session.
//     This is why PassportJS library is used, as it abstracts this away and directly maintains authenticated users for each session within the "req.session.passport.user.{..}"
passport.serializeUser((user, done) => {
    logger.debug('[LocalStrategy Authentication]: serializeUser -> ' + JSON.stringify(user));
    done(null, user.username);
})

// WHAT DOES DE SERIALIZE USER MEAN?
// 1. Passport JS conveniently populates the "userObj" value in the deserializeUser() with the object attached at the end of "req.session.passport.user.{..}"
// 2. When the done (null, user) function is called in the deserializeUser(), Passport JS takes this last object attached to "req.session.passport.user.{..}", and attaches it to "req.user" i.e "req.user.{..}"
// In our case, since after calling the done() in "serializeUser" we had req.session.passport.user.{id: 123, name: "Kyle"},
// calling the done() in the "deserializeUser" will take that last object that was attached to req.session.passport.user.{..} and attach to req.user.{..}
// i.e. req.user.{id: 123, name: "Kyle"}
// 3. So "req.user" will contain the authenticated user object for that session, and you can use it in any of the routes in the Node JS app.
// eg.
// app.get("/dashboard", (req, res) => {
//     res.render("dashboard.ejs", {name: req.user.name})
// })
passport.deserializeUser((username, done) => {
    logger.debug('[LocalStrategy Authentication]: deserializeUser -> ' + JSON.stringify(user));
    // find user by username
    let user = {
        username: username
    }
    done(null, user);
})


function dummyAuthentication(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            logger.debug(`[LocalStrategy DummyAuthentication] Authentication data ${username} password: ${password}`)
            if (username === 'alejovic' && password === 'P@ssport') {
                resolve({
                    status: 'success',
                    message: 'authentication is valid',
                    user: {
                        username: username,
                    }
                });
                return;
            }
            reject({
                status: 'error',
                message: 'authentication is not valid',
                username: username,
            });
        }, 3000);
    });
};

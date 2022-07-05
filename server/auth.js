const passport = require('passport');
const LocalStrategy = require('passport-local');
const {User} = require("../model");

passport.use(new LocalStrategy(async (username, password, done) => {
    let user;
    try {
        //try to find user
        user = await User.findOne({
            "username":username,
            "password": password
        });
        //if user doesn't exist
        if (!user) {
            return done(null, false);
        }
        //succeeded
        return done(null, user)
    } catch (err) {
        //if error finding user
        return done(err);
    }
}));

//setup authorization
const setupAuth = function (app) {
    app.use(passport.initialize());
    app.use(passport.authenticate("session"));

    passport.serializeUser((user, callback) => {
        callback(null, {id: user._id, username: user.username});
    });
    passport.deserializeUser((user, callback) => {
        return callback(null, user);
    });

    app.post("/session", passport.authenticate("local"), (request, response) => {
        response.status(201).json({message: "successfully authenticated session"});
    });


    app.get("/session", (request, response) => {
        //if there is no user in the request
        if (!request.user) {
            response.status(401).json({message: "unauthenticated, login required"});
            return 
        }
        response.status(201).json({message: "authenticated", id: request.user});
    })
};

module.exports = setupAuth;
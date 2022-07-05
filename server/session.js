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
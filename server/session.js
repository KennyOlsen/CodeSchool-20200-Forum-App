const session = require('express-session');

const setupSessionsStore = function (app) {
    app.use(
        session({
            secret: 'crazyKarl',
            resave: false,
            saveUninitialized: false
        })
    );
};

module.exports = setupSessionsStore;
const express = require('express');
const { User } = require('../model');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.static(`${__dirname}/public/`));
app.use(express.json());

const setupSessionsStore = require('./session');
const setupAuth = require('./auth');

setupSessionsStore(app);
setupAuth(app);

app.post("/users", async (request, response) => {
    try {
        let user = await User.create ({
            username: request.body.username,
            fullname: request.body.fullname,
            password: request.body.password
        });
        response.status(201).json(user);
    } catch (err) {
        response.status(400).json({
            message: 'post request failed to create user',
            error: err
        });
    }
});

app.post("/thread", (request, response) => {

});

module.exports = app;
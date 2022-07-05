const express = require('express');
const { User } = require('./model');
const app = express();

app.use(express.static(`${__dirname}/public/`));


app.post("/user", async (request, response) => {
    try {
        User.create ({
            username: request.body.username,
            fullname: request.body.fullname,
            password: request.body.password
        });
        response.status(201).json(user);
    } catch (err) {
        response.status(400).json({
            message: 'post request failed to create user',
            error: error
        })
    }
})

module.exports = app;
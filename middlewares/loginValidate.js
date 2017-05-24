'use strict';

const User = require('../models/User');

module.exports = (req, res, next) => {

    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ 'email': email, 'password': password }, function (err, user) {
        if (err) return handleError(err);

        if(user) {
            req.session.user = user;
            next();
        } else {
            return res.status(401).send('Invalid Credentials');
        }
    });
}
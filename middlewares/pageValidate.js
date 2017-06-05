'use strict';

const User = require('../models/User');

module.exports = (req, res, next) => {

    let username = req.params.username;

    if (username == 'all') {
        res.user = username;
        next();
    } else {
        User.findOne({ 'username': username }, function (err, user) {
            if (err) return handleError(err);

            if (user) {
                res.user = user;
                next();
            } else {
                res.status(404).send('page not found');
            }
        });
    }
}
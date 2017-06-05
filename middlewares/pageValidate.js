'use strict';

const User = require('../models/User');

module.exports = (req, res, next) => {

    let username = req.params.username;

    if (username == 'all') {
        let user = {};
        user.firstname = "All posts";
        user.lastname = "of the site";
        user.username = "all";

        res.user = user;

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
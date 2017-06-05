'use strict';

const User = require('../models/User');

module.exports = (req, res, next) => {

    let username = req.params.username;

    res.isHashtag = false;
    if ((username[0] + username[1]) == "H_") {
        // Hasttag
        res.isHashtag = true;

        let user = {};
        user.firstname = "#" + username.substring(2);
        user.lastname = "all posts";
        user.username = "hashtag";

        res.user = user;
        next();


        // All Posts or user
    } else if (username == 'all') {
        // All posts
        let user = {};
        user.firstname = "All posts";
        user.lastname = "of the site";
        user.username = "all";

        res.user = user;

        next();
    } else {
        // User
        User.findOne({ 'username': username }, function (err, user) {
            if (err) return handleError(err);

            if (user) {
                res.user = user;
                next();
            } else {
                return res.status(404).send('page not found');
            }
        });
    }
}

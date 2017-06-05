'use strict';

const Post = require('../models/Post');

module.exports = (req, res, next) => {

    let username = req.params.username;

    if(username == 'all') {

        Post.find({}).sort({date: -1}).exec((err, posts) => {
            if (err) return handleError(err);

            if(posts) {
                res.posts = posts;
                next();
            }
        });

    } else {
        Post.find({ 'username': username }).sort({date: -1}).exec((err, posts) => {
            if (err) return handleError(err);

            if(posts) {
                res.posts = posts;
                next();
            } else {
                res.status(404).send('page not found');
            }
        });
    }
}
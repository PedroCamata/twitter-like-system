'use strict';

const Post = require('../models/Post');

module.exports = (req, res, next) => {

    let username = req.params.username;

    if(res.isHashtag) {

        // Hashtag posts
        let query = "#" + username.substring(2) + "";

        Post.find({"msg": new RegExp(query)}).sort({date: -1}).exec((err, posts) => {
            if (err) return handleError(err);

            if(posts) {
                res.posts = posts;
                next();
            }
        });

    } else if(username == 'all') {
        // All Posts

        Post.find({}).sort({date: -1}).exec((err, posts) => {
            if (err) return handleError(err);

            if(posts) {
                res.posts = posts;
                next();
            }
        });

    } else {
        // User Posts
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
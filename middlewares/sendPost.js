'use strict';

const Post = require('../models/Post');

module.exports = (req, res, next) => {

    let username = req.session.user.username;
    let msg = req.body.msg;

    let newPost = new Post();
    newPost.username = username;
    newPost.msg = msg;
    
    newPost.save((err, savedUser) => {
        if(err) {
            console.log(err);
            return res.status(406).send('Error: ' + err);
        } else {
            next();
        }
        
    });
}
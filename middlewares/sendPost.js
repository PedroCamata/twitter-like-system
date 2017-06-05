'use strict';

const Post = require('../models/Post');

module.exports = (req, res, next) => {

    let msg = req.body.msg;
    if(msg.length > 140) {
        return res.status(406).send('Error: Message has more than 140 characters');
    }

    let username = req.session.user.username;
    if(!username) {
        return res.status(406).send('Error: You are not loggin');
    }

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
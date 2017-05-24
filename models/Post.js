'use strict';

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    username: { type: String, require: true },
    msg: { type: String, require: true },
    date: { type: Date, default: Date.now }
});

const post = mongoose.model('posts', postSchema);
module.exports = post;
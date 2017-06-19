'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    birth: { type: Date, require: true },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('users', userSchema);
module.exports = User;
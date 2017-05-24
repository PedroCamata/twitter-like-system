'use strict';

const express = require('express')
, path = require('path');

// db
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/twitterClone');
mongoose.connection.on('error', (err) => {
    console.log('Mongo error: ' + err);
});

const app = express();

// Public Files
app.use(express.static(path.join(__dirname, 'public')));

// View, templaters
app.engine('html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
const router = require(path.join(__dirname, 'controllers'));
app.use(router);

// Terminal
app.listen(3000, (res,req) => {
    console.log("Server running at localhost:3000");
})
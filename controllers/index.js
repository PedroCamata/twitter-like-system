'use strict';

const path = require('path')
, router = require('express').Router()
, session = require('express-session')
, bodyParser = require('body-parser')
, auth = require(path.join( __dirname, "../middlewares/auth"))
, loginValidate = require(path.join( __dirname, "../middlewares/loginValidate"))
, sendPost = require(path.join( __dirname, "../middlewares/sendPost"))
, getPosts = require(path.join( __dirname, "../middlewares/getPosts"))
, User = require(path.join(__dirname, '../models/User.js'));

// BodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

//Session
router.use(session({secret: 'twitter-secret',resave: false, saveUninitialized: true}));

router.post('/api/login', loginValidate, (req, res, user) => {
    let username = req.session.user.username;

    console.log(req.session.user.username);

    res.redirect("/page/" + username);
});

router.post('/api/register', (req, res) => {
    console.log(req.body);

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    let newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;

    newUser.save((err, savedUser) => {
        if(err) {
            console.log(err);
            return res.status(406).send('Error: ' + err);
        }
        res.send("Cannot register");
    });
})

router.post('/api/post', auth, sendPost, (req, res) => {

    console.log("aefef");

    let username = req.session.user.username;
    res.redirect("/page/" + username);
});

router.get('/page/:username', getPosts, (req, res) => {

    let posts = res.posts;

    res.send(posts);
    //res.render('dashboard', {name: firstname});
});

module.exports = router;
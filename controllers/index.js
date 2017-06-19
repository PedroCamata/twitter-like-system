'use strict';

const path = require('path')
    , router = require('express').Router()
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , auth = require(path.join(__dirname, "../middlewares/auth"))
    , loginValidate = require(path.join(__dirname, "../middlewares/loginValidate"))
    , pageValidate = require(path.join(__dirname, "../middlewares/pageValidate"))
    , sendPost = require(path.join(__dirname, "../middlewares/sendPost"))
    , getPosts = require(path.join(__dirname, "../middlewares/getPosts"))
    , User = require(path.join(__dirname, '../models/User.js'));

// BodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//Session
router.use(session({ secret: 'twitter-secret', resave: false, saveUninitialized: true }));


router.get('/login', (req, res) => {
    let msg = "";
    res.render('login', { msg });
});

router.post('/api/login', loginValidate, (req, res, user) => {
    let username = req.session.user.username;
    res.redirect("/page/" + username);
});

router.get('/logout', (req, res, user) => {
    let username = req.session.user.username;
    req.session.destroy();
    res.redirect("/page/" + username);
});

router.get('/register', (req, res, user) => {
    res.render('register');
});

router.post('/api/register', (req, res) => {
    //console.log(req.body);

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let birth = req.body.birth;

    let newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.birth = birth;

    newUser.save((err, savedUser) => {
        if (err) {
            console.log(err);
            return res.status(406).send('Error: ' + err);
        } else {
            res.redirect('/login');
        }
    });
})

router.get('/edit', auth, (req, res) => {
    console.log(req.session.user);
    let user = req.session.user;

    res.render("edit", { user });
})

router.post('/api/edit', (req, res) => {
    console.log(req.body);

    console.log(req.session.user);

    //let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let birth = req.body.birth;

    let actualUsername = req.session.user.username;

    User.findOne({ username: actualUsername }, function (err, doc) {
        //doc.username = username;
        doc.email = email;
        doc.password = password;
        doc.firstname = firstname;
        doc.lastname = lastname;
        doc.birth = birth;

        doc.save();
        res.redirect("/page/" + actualUsername);
    });

    //req.session.user.username = username;
    req.session.user.email = email;
    req.session.user.password = password;
    req.session.user.firstname = firstname;
    req.session.user.lastname = lastname;
    req.session.user.birth = birth;
})


router.post('/api/post', auth, sendPost, (req, res) => {
    let username = req.session.user.username;
    res.redirect("/page/" + username);
});

router.post('/api/page', (req, res) => {
    let usernameString = req.body.search_user.replace("#", "H_");

    res.redirect("/page/" + usernameString);
});

router.get('/page/:username', pageValidate, getPosts, (req, res) => {

    let page_user = res.user;
    let isOwner = false;
    let isLogged = true;
    let user = null;

    if (req.session.user) {
        user = req.session.user;
        if (page_user.username == user.username) {
            isOwner = true;
        }
    } else {
        isLogged = false;
    }

    let posts = res.posts;

    //res.send(posts);
    res.render('page', { posts, page_user, isLogged, isOwner, user });
});

module.exports = router;
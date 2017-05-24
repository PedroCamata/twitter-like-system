'use strict';

module.exports = (req, res, next) => {
    if(!req.session.user) {
        return res.status(401).send("Error: You have to log to acess this page")
        //return res.status(401).redirect('/login?m=You have to log to acess this page');
    }
    next();
}
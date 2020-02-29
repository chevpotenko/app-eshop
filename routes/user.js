const router = require('express').Router();
const path = require('path');

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.sendFile(path.join(__dirname, '../', '/public/index.html'));
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

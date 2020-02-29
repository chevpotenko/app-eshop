const router = require('express').Router();
const Users = require('../../models/users');
const passport = require('passport');

router.get('/user/signup', (req, res, next) => {
    Users.find({}, function(err, users) {
        if (err) {
            console.log('Users:' + err);
        } else {
            res.json(users);
        }
    });
});

router.post('/user/signup', (req, res, next) => {
    passport.authenticate('local.signup', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            res.status(401).send(info);
        } else {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json(req.body);
            });
        }
    })(req, res, next);
});

router.get('/user/signin', (req, res, next) => {
    res.json({ signin: req.isAuthenticated() });
});

router.post('/user/signin', (req, res, next) => {
    passport.authenticate('local.signin', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            res.status(401).send(info);
        } else {
            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.json(req.body);
            });
        }
    })(req, res, next);
});

module.exports = router;

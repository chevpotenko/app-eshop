const passport = require('passport');
const User = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

const localStrategySignUp = new LocalStrategy(strategyOptions,
    function(req, email, password, done) {
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
        let errors = req.validationErrors();
        if (errors) {
            let messages = errors.map(error => error.msg);
            return done(null, false, { message: messages });
        }
        User.findOne({ 'email': email }, function(err, user) {
            if(err) { return done(err); }
            if(user) {
                return done(null, false, { message: ['Email is already in use'] });
            }
            let newUser = new User();
            newUser.email = email;
            newUser.password = newUser.encryptPassword(password);
            newUser.save(function(err, result) {
                if (err) { return done(err); }
                return done(null, newUser);
            });
        });
    });

const localStrategySignIn = new LocalStrategy(strategyOptions,
    function(req, email, password, done) {
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('password', 'Invalid password').notEmpty();
        let errors = req.validationErrors();
        if (errors) {
            let messages = errors.map(error => error.msg);
            return done(null, false, { message: messages });
        }
        User.findOne({ 'email': email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: ['No user found.'] });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: ['Wrong password.'] });
            }
            return done(null, user);
        });
    });

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use('local.signup', localStrategySignUp);
    passport.use('local.signin', localStrategySignIn);

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};

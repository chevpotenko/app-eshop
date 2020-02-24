const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

module.exports = session({
    secret: process.env.COOKIE_SECRETE,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 60 * 60 * 1000 }
});

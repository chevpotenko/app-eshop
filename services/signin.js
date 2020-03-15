const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = function(req, res) {
    const { email, password } = req.body;
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    const errors = req.validationErrors();
    const token = jwt.sign({ email }, process.env.JWT_SECRETE, { expiresIn: '1h' });

    if (errors) {
        res.send(400).json({
            success: false,
            message: 'Authentication failed! Please check the request!'
        });
    } else {
        User.findOne({ email }, function(err, user) {
            if (err) {
                console.log('User:' + err);
            }
            if (user.email === email && user.password === password) {
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password!'
                });
            }
        });
    }
}

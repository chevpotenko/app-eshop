const jwt = require('jsonwebtoken');
const User = require('../models/users');

module.exports = function(req, res) {
    const { email, password } = req.body;
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 4 });
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
            if (user) {
                res.json({
                    success: false,
                    message: 'Email is already in use!',
                });
            } else {
                let newUser = new User();
                newUser.email = email;
                newUser.password = newUser.encryptPassword(password);
                newUser.save(function(err, result) {
                    if (err) { console.log('User:' + err); }
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                });
            }
        });
    }
};

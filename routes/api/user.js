const router = require('express').Router();
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const userSignUp = require('../../services/signup');

const refreshTokens = require('../../services/jwt-tokens');
const secret = process.env.JWT_SECRETE;

router.post('/user/signup', userSignUp);

router.post('/user/signin', (req, res) => {
    const { username, password } = req.body;
    const user = {
        'username': username,
        'role': 'admin'
    };
    const token = jwt.sign(user, process.env.JWT_SECRETE, { expiresIn: 600 });
    const refreshToken = randtoken.uid(256);

    refreshTokens[refreshToken] = username;
    res.json({ jwt: token, refreshToken: refreshToken });
});

router.post('/user/signout', function (req, res) {
    const refreshToken = req.body.refreshToken;

    if (refreshToken in refreshTokens) {
        delete refreshTokens[refreshToken];
    }
    res.sendStatus(204);
});

router.get('/refresh', function(req, res) {
    const refreshToken = req.body.refreshToken;

    if (refreshToken in refreshTokens) {
        const user = {
            'username': refreshTokens[refreshToken],
            'role': 'admin'
        };
        const token = jwt.sign(user, secret, { expiresIn: 600 });
        res.json({ jwt: token })
    }
    else {
        res.sendStatus(401);
    }
});

module.exports = router;

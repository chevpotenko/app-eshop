const path = require('path');
const router = require('express').Router();
const csrfProtection = require('../middlewares/csurf')

router.get('*', csrfProtection, function (req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(path.resolve( __dirname, '../',  'public', 'index.html'));
});

module.exports = router;

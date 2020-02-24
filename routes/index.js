const path = require('path');
const router = require('express').Router();
const csrf = require('../node_modules/csurf');

router.use(csrf());

router.get('*', function (req, res) {
    res.sendFile(path.resolve( __dirname, '../',  'public', 'index.html'));
});

module.exports = router;

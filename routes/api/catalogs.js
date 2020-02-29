const router = require('express').Router();
const Catalogs = require('../../models/catalogs');

router.get('/catalogs', function(req, res, next) {
    Catalogs.find({}, function(err, catalogs) {
        if (err) {
            console.log('Catalogs:' + err);
        } else {
            res.json(catalogs);
        }
    });
});

module.exports = router;

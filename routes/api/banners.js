const router = require('express').Router();
const Banners = require('../../models/banners');

router.get('/banners', function(req, res, next) {
    Banners.find({}, function(err, banners) {
        if (err) {
            console.log('Banners:' + err);
        } else {
            res.json(banners);
        }
    });
});

module.exports = router;

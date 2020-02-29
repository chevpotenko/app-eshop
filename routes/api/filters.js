const router = require('express').Router();
const Filters = require('../../models/filters');

router.get('/filters', function(req, res, next) {
    Filters.find({}, function(err, banners) {
        if (err) {
            console.log('Filters:' + err);
        } else {
            res.json(banners);
        }
    });
});

module.exports = router;

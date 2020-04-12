const router = require('express').Router();
const Pages = require('../../models/pages');

router.get('/pages/:id', (req, res, next) => {
    Pages
        .where({ id: req.params.id })
        .findOne(function(err, product) {
            if(err) {
                console.log('Pages:' + err);
            } else {
                res.json(product);
            }
        });
});

module.exports = router;

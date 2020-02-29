const router = require('express').Router();
const Products = require('../../models/products');

router.get('/products', function(req, res, next) {
    Products.find({}, function(err, goods) {
        if(err) {
            console.log('Products:' + err);
        } else {
            res.json(goods);
        }
    });
});

router.get('/products/:id', (req, res, next) => {
    Products
        .where({ id: req.params.id })
        .findOne(function(err, product) {
            if(err) {
                console.log('Products:' + err);
            } else {
                res.json(product);
            }
        });
});

module.exports = router;

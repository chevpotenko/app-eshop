const router = require('express').Router();

router.get('/cart', (req, res) => {
    if (!req.session.cart) {
        res.json([]);
    } else {
        res.json(req.session.cart);
    }
});

router.put('/cart/:id', (req, res) => {
    let cart = [];
    let isAdded = false;
    if(req.session.cart) {
        isAdded = req.session.cart.find(item => req.body.product.id === item.product.id);
        cart = req.session.cart
            .map(item => req.body.product.id === item.product.id
                ? req.body
                : item
            );
    }
    if (!isAdded) {
        cart.push(req.body);
    }
    req.session.cart = cart;
    res.json(cart);
});

module.exports = router;

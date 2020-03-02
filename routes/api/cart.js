const router = require('express').Router();
const { addToCart }  = require('../../services/cart');

router.get('/cart', (req, res) => {
    if (!req.session.cart) {
        res.json([]);
    } else {
        res.json(req.session.cart);
    }
});

router.put('/cart/:id', addToCart);

module.exports = router;

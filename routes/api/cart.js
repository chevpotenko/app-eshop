const router = require('express').Router();
const Products = require('../../models/products');
const Cart = require('../../utils/cart');

router.get('/cart', (req, res, next) => {
    if (!req.session.cart) {
        res.json({ items: [], totalPrice: 0, totalQty: 0 });
    } else {
        const cart = new Cart(req.session.cart);
        res.json({items: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty});
    }
});

router.get('/cart/add/:id', (req, res, next) => {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    Products.findById(productId, function(err, product) {
        if(err) {
            return res.json({ "error": "empty products" });
        }
        cart.add(product, product._id);
        req.session.cart = cart;
        res.json(cart);
    });
});

module.exports = router;

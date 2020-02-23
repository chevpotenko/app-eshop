const express = require('express');
const passport = require('passport');
const router = express.Router();
const Banners = require('../models/banners');
const Products = require('../models/products');
const Catalogs = require('../models/catalog');
const Users = require('../models/users');
const Cart = require('../models/cart');

router.get('/products', function(req, res, next) {
  Products.find({}, function(err, goods) {
    if(err){
      console.log('Products:' + err);
    }else{
      res.json(goods);
    }
  });
});

router.get('/catalogs', function(req, res, next) {
  Catalogs.find({}, function(err, catalogs) {
    if (err) {
      console.log('Catalogs:' + err);
    } else {
      res.json(catalogs);
    }
  });
});

router.get('/banners', function(req, res, next) {
  Banners.find({}, function(err, banners) {
    if(err){
        console.log('Banners:' + err);
    }else{
      res.json(banners);
    }
  });
});

router.get('/user/signup', (req, res, next) => {
  Users.find({}, function(err, users) {
    if(err){
        console.log('Users:' + err);
    }else{
      res.json(users);
    }
  });
});

router.post('/user/signup', (req, res, next) => {
  passport.authenticate('local.signup', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if(!user){
      res.status(401).send(info);
    }else{
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json(req.body);
      });
    }
  })(req, res, next);
});

router.post('/user/signin', (req, res, next) => {
  passport.authenticate('local.signin', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if(!user){
      res.status(401).send(info);
    }else{
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.json(req.body);
      });
    }
  })(req, res, next);
});

router.get('/cart/add/:id', (req, res, next) => {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Products.findById(productId, function(err, product) {
    if(err) {
      return res.json({"error": "empty products"});
    }
    cart.add(product, product._id);
    req.session.cart = cart;
    res.json(cart);
  });
});

router.get('/shoppingcart', (req, res, next) => {
  if(!req.session.cart) {
    res.json({items: [], totalPrice: 0, totalQty: 0});
  }
  var cart = new Cart(req.session.cart);
  res.json({items: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty});
});

module.exports = router;

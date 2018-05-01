var path = require('path');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var Banners = require('../models/banners');
var Goods = require('../models/goods');
var Users = require('../models/users');
var Cart =require('../models/cart');

router.get('/goods', function(req, res, next) { 
  Goods.find({}, function(err, goods) {
    if(err){
      console.log('Goods:' + err); 
    }else{
      res.json(goods);
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
  Goods.findById(productId, function(err, goods) {
    if(err) {
      return res.json({"error": "empty goods"});
    }
    cart.add(goods, goods._id);
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
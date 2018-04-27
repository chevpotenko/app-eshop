var path = require('path');
var express = require('express');
var passport = require('passport');
var router = express.Router();

var Banners = require('../models/banners');
var Goods = require('../models/goods');
var csrf = require('../node_modules/csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res, next) { 
  res.sendfile('./public/index.html');
});

router.get('/catalog', function(req, res, next) {  
  res.sendfile('./public/index.html');
});

router.get('/user/signup', function(req, res, next) {  
  res.sendfile('./public/index.html');
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: false
}));

router.get('/user/profile', function(req, res, next) {  
  res.sendfile('./public/index.html');
});

// router.get('/api/user/signup', function(req, res, next) {
//   console.log({"csrfToken": req.csrfToken()})   
//   res.json({"csrfToken": req.csrfToken()});      
// });

router.get('/api/goods', function(req, res, next) { 
  Goods.find({}, function(err, goods) {
    if(err){
      console.log('Goods:' + err); 
    }else{
      res.json(goods);
    } 
  });
});

router.get('/api/banners', function(req, res, next) {
  Banners.find({}, function(err, banners) {
    if(err){
        console.log('Banners:' + err); 
    }else{ 
      res.json(banners);
    }   
  });
});

module.exports = router;
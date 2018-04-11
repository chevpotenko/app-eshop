var express = require('express');
var router = express.Router();

var Banners = require('../models/banners');
var Goods = require('../models/goods');

router.get('/', function(req, res, next) {  
  res.render('index');      
});

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
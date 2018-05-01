var path = require('path');
var express = require('express');
var passport = require('passport');
var router = express.Router();

var csrf = require('../node_modules/csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/', function(req, res, next) { 
  res.sendfile('./public/index.html');
});

router.get('/catalog', function(req, res, next) {  
  res.sendfile('./public/index.html');
});

router.get('/shoppingcart', function(req, res, next) {  
  res.sendfile('./public/index.html');
});

module.exports = router;
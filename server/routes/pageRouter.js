'use strict'
var express = require('express');
var router = express.Router();
var models = require('../models/index');
var controllers = require('../controllers');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function(req, res, next){
  controllers.home(req, res, next);
});

module.exports = router;
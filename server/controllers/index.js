'use strict'
var fs = require('fs');
var path = require('path');
var basename = path.resolve(__dirname, path.basename(module.filename));


var fileArray = [], controllers = {};

(function readdir(dirname){
  fs
    .readdirSync(dirname)
    .forEach(function(file) {
      var filePath = path.resolve(dirname, file);
      return filePath !== basename && (file.indexOf('.') !== -1 && fileArray.push( filePath )) || (file.indexOf('.') == -1 && readdir( filePath ));
    })
})(__dirname);

fileArray
  .forEach(function(file) {
    Object.assign(controllers, require(file));
  });

module.exports = controllers;
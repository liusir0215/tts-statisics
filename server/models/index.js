'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename = path.resolve(__dirname, path.basename(module.filename));
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

var fileArray = [];


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
    if (file.slice(-3) !== '.js') return;
    var model = sequelize['import'](file);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

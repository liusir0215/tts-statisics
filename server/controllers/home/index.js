'use strict'

var models = require('../../models/index');

module.exports = {
	home: function(req, res, next){
		models.Todo.findAll({}).then(function(todos) {
		    res.render('home', {title: '淘淘搜统计', todoList: todos});
		});
	}
};
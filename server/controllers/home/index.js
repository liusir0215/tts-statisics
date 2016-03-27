'use strict'

var models = require('../../models/index');

module.exports = {
	home: function(req, res, next){
		models.Todo.findAll({}).then(function(todos) {
		    res.render('home', {todoList: todos});
		});
	}
};
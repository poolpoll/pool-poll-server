/**
 * Menu Routing
 */
var router = require('express').Router();
var Menu = require('../models/menu');

module.export(function() {
	router.get('/menus', function(req, res) {
		Menu.findAll().then(function(menus) {
			menus.sort(function(prev, next) {
				return prev.rank < next.rank ? -1 : prev.rank > next.rank ? 1 : 0;
			})

			res.send(menus);
		})
	})
});
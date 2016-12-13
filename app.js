/**
 * Modules
 */
var express = require('express');
var cors = require('cors');
var app = express();
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://b9fb99c87cbebe:64b9ddde@us-cdbr-iron-east-04.cleardb.net/heroku_74f00feb4343db4');
var bodyParser = require('body-parser');

/**
 * Custom Modules
 * Routes
 */
var menuController = require('/routes/menuController');

/**
 * Module Attache Section
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Custom Module Attache Section
 */
app.use(menuController);

app.listen(3000, function() {
	console.log('Server running on port 3000');
});
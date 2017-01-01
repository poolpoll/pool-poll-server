/**
 * Modules
 */
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');

/**
 * Module Attache Section
 */
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: '시크릿중 탑은 길라임 시크릿 가든',
	resave: false,
	saveUninitialized: true
}))

/**
 * Custom Modules
 * Routes
 */
var db = require('./config/db.js');
var menuController = require('./controllers/menuController')(app, db);
var pollController = require('./controllers/pollController')(app, db);
var authController = require('./controllers/authController')(app, db);
var categoryController = require('./controllers/categoryController')(app, db);

/**
 * Custom Module Attache Section
 */
app.listen(3000, function() {
	console.log('Server running on port 3000');
});
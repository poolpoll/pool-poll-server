var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var sequelize = new Sequelize('mysql://b9fb99c87cbebe:64b9ddde@us-cdbr-iron-east-04.cleardb.net/heroku_74f00feb4343db4');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const Poll = sequelize.define('polls', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	user_id: {
		type: Sequelize.INTEGER
	},
	from_date: {
		type: Sequelize.STRING
	},
	to_date: {
		type: Sequelize.STRING
	},
	count: {
		type: Sequelize.INTEGER
	}
}, {
	timestamps: false
});

const Menu = sequelize.define('menus', {
	rank: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING
	},
	url: {
		type: Sequelize.STRING
	}
}, {
	timestamps: false
});

app.get('/my_polls', function(req, res) {
	Poll.findAll().then(function(items) {
		res.send(items);
	});
});

app.post('/my_polls', function(req, res) {
	console.log(req.body.name);
});

app.get('/menus', function(req, res) {
	Menu.findAll().then(function(items) {
		res.send(items);
	});
});

app.listen(3000, function() {
	console.log('Server running on port 3000');
});
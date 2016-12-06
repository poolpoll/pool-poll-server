var express = require('express');
var Sequelize = require('sequelize');
var cors = require('cors');
var app = express();

var sequelize = new Sequelize('mysql://root:password@192.168.0.43:3306/free_poll');

var poll = sequelize.define('polls', {
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
	},
}, {
	timestamps: false
});

app.use(cors());

app.get('/test_orm', function(req, res) {
	poll.findAll().then(function(items) {
		res.send(items);
	});
});

app.get('/menus', function(req, res) {
	var menuList = [{
		name: 'My Polls',
		url: 'my_polls'
	}, {
		name: 'Sign In',
		url: 'sign_in'
	}];
});

app.get('/my_polls', function(req, res) {
	var pollList = [{
		id: 'test-poll',
		title: 'Test Poll',
		openDate: '2016-12-03',
		closeDate: '2016-01-03',
		status: 'Open',
		pollCount: 1423
	}, {
		id: 'demo-poll',
		title: 'Demo Poll',
		openDate: '2016-09-11',
		closeDate: '2016-10-11',
		status: 'Closed',
		pollCount: 4237
	}, {
		id: 'park-still',
		title: 'Is Park still president?',
		openDate: '2016-11-25',
		closeDate: '2017-03-25',
		status: 'Open',
		pollCount: 513324
	}, {
		id: 'team-fav',
		title: 'Which Team is your favorite?',
		openDate: '2016-11-15',
		closeDate: '2017-01-01',
		status: 'Open',
		pollCount: 320
	}, {
		id: 'do-i-die',
		title: 'Do I have to DIE?',
		openDate: '2015-07-10',
		closeDate: '2015-07-12',
		status: 'Closed',
		pollCount: 312
	}];

	res.send(pollList);
})

app.listen(3000, function() {
	console.log('Server running on port 3000');
})
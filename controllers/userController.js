/**
 * User Controller
 */
module.exports = function(app, db) {
	app.get('/users', function(req, res) {
		db.User.findAll().then(function(users) {
			res.send(users);
		})
	});

	app.get('/users/:id', function(req, res) {
		db.User.find({
			where: req.params
		}).then(function(user) {
			res.send(user);
		})
	});

	app.post('/users/:id', function(req, res) {
		db.User.update(req.body, {
			where: req.params
		}).then(function(user) {
			res.send(user);
		})
	});

	app.post('/users/categories/:id', function(req, res) {
		db.User.update({
			favoriteCategories: req.body.favoriteCategories
		}, {
			where: req.params
		})
	})
};

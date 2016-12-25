/**
 * Category Controller
 */

module.exports = function(app, db) {
	app.get('/categories', function(req, res) {
		db.Category.findAll().then(function(categories) {
			res.send(categories);
		});
	});
};
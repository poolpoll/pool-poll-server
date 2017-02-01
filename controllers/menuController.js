/**
 * Menu Controller
 */
module.exports = function(app, db) {
	app.get('/menus', function(req, res) {
		db.Menu.findAll().then(function(menus) {
			menus.sort(function(prev, next) {
				return prev.rank < next.rank ? -1 : prev.rank > next.rank ? 1 : 0;
			});

			res.send(menus);
		})
	})
};
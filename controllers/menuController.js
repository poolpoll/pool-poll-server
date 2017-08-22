/**
 * Menu Controller
 */
module.exports = function(app, db) {
	app.get('/menus', function(req, res) {
		db.Menu.findAll({
			order: [
				['rank']
			]			
		}).then(function(menus) {
			res.send(menus);
		})
	})
};
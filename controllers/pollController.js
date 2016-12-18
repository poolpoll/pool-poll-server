/**
 * Poll Controller
 */
module.exports = function(app, db) {
	app.get('/polls', function(req, res) {
		db.Poll.findAll().then(function(polls) {
			res.send(polls);
		})

	}),
	
	app.get('/polls/:user_id', function(req, res) {
		db.Poll.findAll({
			where: {
				user_id: req.params.user_id
			}
		}).then(function(polls) {
			res.send(polls);
		})
	})
};
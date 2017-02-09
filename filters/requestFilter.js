/**
 * request filter
 */

const AuthUtill = require('../utills/AuthUtill.js');

module.exports = function(app, db) {
	app.all('/*', function(req, res, next) {
		if(req.session.userId) {
			next();
		} else if (req.url == '/auth/sign_in') {
			var body = req.body;
			var account = body.account;
			var rawPwd = body.password;

			db.User.find({
				where: {
					account: account
				}
			}).then(function(user) {
				var salt = user.salt;
				var encryptedPassword = AuthUtill.encryptPassword(rawPwd, salt);

				if(user && user.encryptedPassword === encryptedPassword) {
					req.session.userId = user.id;
					res.send(true);
				} else {
					res.send(false);
				}
			})
		} else if (req.url == '/auth/sign_up') {
			next();
		} else {
			res.status(401).send('Unauthorized.');
		}
	})
}
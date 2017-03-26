/**
 * Auth Controller
 */

const AuthUtil = require('../utils/AuthUtil.js');

module.exports = function(app, db) {
	app.post('/auth/sign_in', function(req, res) {
		var body = req.body;
		var account = body.account;
		var rawPwd = body.password;

		db.User.find({
			where: {
				account: account
			}
		}).then(function(user) {
			var encryptPassword = AuthUtil.encryptPassword(rawPwd, user.salt);

			if(user && user.encryptedPassword === encryptPassword) {
				req.session.userId = user.id;
				var userInfo = {
					id: user.id,
					name: user.name,
					email: user.email,
					birthDate: user.birthDate,
					gender: user.gender
				};

				res.send(userInfo);

			} else {
				res.send(false);
			}
		})
	});

	app.post('/auth/sign_up', function(req, res) {
		var data = req.body;
		var rawPwd = data.password;
		var salt = AuthUtil.generateSalt();
		var encryptedPassword = AuthUtil.encryptPassword(rawPwd, salt);

		data.encryptedPassword = encryptedPassword;
		data.salt = salt;

		db.User.create(data).then(function() {
			res.send(true);
		}, function(e) {
			console.error(e);
			res.send(false);
		})
	});
}

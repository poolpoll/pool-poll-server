/**
 * Auth Controller
 */

const AuthUtil = require('../utills/AuthUtill.js');

module.exports = function(app, db) {
	app.post('/auth/sign_in', function(req, res) {
		var body = req.body;
		var account = body.account;
		var rawPwd = body.password;
		var encrypted_password = AuthUtil.encryptPassword(rawPwd);

		db.User.find({
			where: {
				account: account
			}
		}).then(function(user) {
			console.log(user);
			if(user && user.encrypted_password === encrypted_password) {
				res.send(true);
			} else {
				res.send(false);
			}
		})
	})

	app.post('/auth/sign_up', function(req, res) {
		var body = req.body;
		var rawPwd = body.password;

		var encrypted_password = AuthUtil.encryptPassword(rawPwd);

		db.User.create({
			account: body.account,
			name: body.name,
			encrypted_password: encrypted_password,
			email: body.email
		}).then(function() {
			res.send(true);
		}, function() {
			console.log('falied');
		})
	})
}
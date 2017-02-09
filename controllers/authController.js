/**
 * Auth Controller
 */

const AuthUtil = require('../utills/AuthUtill.js');

module.exports = function(app, db) {
	app.post('/auth/sign_in', function(req, res) {
		console.log('Sign in success');
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
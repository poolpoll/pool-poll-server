/**
 * Auth Controller
 */

const AuthUtil = require('../utills/AuthUtill.js');

module.exports = function(app, db) {
	app.get('/users', function(req, res) {
		db.User.findAll().then(function(users) {
			res.send(users);
		}) 
	});

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
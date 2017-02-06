/**
 * Auth Controller
 */

const AuthUtil = require('../utills/AuthUtill.js');
const DateTimeUtill = require('../utills/DateTimeUtill.js');

module.exports = function(app, db) {
	app.post('/auth/sign_in', function(req, res) {
		console.log('Sign in success');
	});

	app.post('/auth/sign_up', function(req, res) {
		var body = req.body;
		var rawPwd = body.password;
		var salt = AuthUtil.generateSalt();
		var encrypted_password = AuthUtil.encryptPassword(rawPwd, salt);
		var signUpDate = DateTimeUtill.getDateTime();

		db.User.create({
			account: body.account,
			name: body.name,
			encrypted_password: encrypted_password,
			salt: salt,
			email: body.email,
			sign_up_date: signUpDate
		}).then(function() {
			res.send(true);
		}, function() {
			console.log('Sign up faield.')
			res.send(false);
		})
	});
}
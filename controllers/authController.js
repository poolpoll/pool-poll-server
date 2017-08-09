/**
 * Auth Controller
 */

const AuthUtil = require('../utils/AuthUtil.js');

module.exports = (app, db) => {
	db.Attachment.hasMany(db.User);

	app.post('/auth/sign_in', (req, res) => {
		var email = req.body.email;
		var rawPwd = req.body.password;

		db.User.findOne({
			where: {
				email: email
			},
			include: [{ model: db.Attachment }]
		}).then(user => {
			if(user) {
				var encryptPassword = AuthUtil.encryptPassword(rawPwd, user.salt);
				if(user && user.encryptedPassword === encryptPassword) {
					req.session.userId = user.id;
					var userInfo = {
						id: user.id,
						name: user.name,
						email: user.email,
						level: user.level,
						birthDate: user.birthDate,
						gender: user.gender,
						attachmentId: user.attachmentId,
						tags: user.tags
					};
					res.send(userInfo);
				} else {
					// 입력한 정보가 올바르지 않습니다. 메시지
					res.send(false);
				}
			} else {
				// 사용자가 등록되어 있지 않습니다. 메시지
				res.send(false);
			}
		}).catch(error => {
			console.error(error);
			res.send(error);
		})
	});

	app.post('/auth/sign_up', (req, res) => {
		var data = req.body;
		var rawPwd = data.password;
		var salt = AuthUtil.generateSalt();
		var encryptedPassword = AuthUtil.encryptPassword(rawPwd, salt);

		data.encryptedPassword = encryptedPassword;
		data.salt = salt;

		db.User.create(data).then(() => {
			res.send(true);
		}).catch(error => {
			console.error(error);
			res.send(false);
		})
	});
}

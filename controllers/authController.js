/**
 * Auth Controller
 */

const AuthUtil = require('../utils/AuthUtil.js');
const AttachmentController = require('../controllers/attachmentController.js');
const multer = require('multer');
const fs = require('fs');
const profileUpload = multer({ dest: './uploads/profiles' });
const nodemailer = require('nodemailer');

module.exports = (app, db) => {
	db.Attachment.hasMany(db.User);

	/**
	 * 로그인 API
	 */
	app.post('/auth/sign_in', (req, res) => {
		var email = req.body.email;
		var rawPwd = req.body.password;

		db.User.findOne({
			where: {
				email: email
			},
			include: [{ model: db.Attachment }]
		}).then(user => {
			if(user && user.active) {
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
				} else if(user && !user.active) {
					// 활성화 되지 않은 사용자
					res.send(false);
				} else {
					res.send(false);
				}
			} else {
				// 사용자가 등록되어 있지 않습니다. 메시지
				res.send(false);
			}
		}).catch(error => {
			console.error(error);
			res.send(false);
		})
	});

	/**
	 * 회원 가입 API
	 */
	app.post('/auth/sign_up', profileUpload.single('profile'), (req, res) => {
		var body = req.body;
		var rawPwd = body.password;
		var salt = AuthUtil.generateSalt();
		var encryptedPassword = AuthUtil.encryptPassword(rawPwd, salt);

		body.encryptedPassword = encryptedPassword;
		body.salt = salt;

		if(res.req.file) {
	    var fileInfo = res.req.file;
	    var data = {
	      id: fileInfo.filename,
	      storage: fileInfo.fieldname,
	      originName: fileInfo.originalname,
	      mimeType: fileInfo.mimetype,
	      path: fileInfo.path,
	      size: fileInfo.size
	    };

			db.Attachment.create(data).then(attachment => {
				body.attachmentId = attachment.id;

				db.User.create(body).then(user => {
					res.send(true);
				}).catch(error => {
					throw error;
					console.error(error);
				})
			})
		};

		db.User.create(body).then(user => {
			res.send(true);
		}).catch(error => {
    	throw error;
    	console.error(error);
    });
	});
	
	/**
	 * 중복 닉네임 체크 API
	 */
	app.get('/auth/name_check/:name', function(req, res) {
		db.User.findAll({
			where: {
				name: req.params.name
			}
		}).then(user => {
			if(user.length == 0) {
				res.send(true);
			} else {
				res.send(false);
			}
		}).catch(error => {
			throw error;
			console.error(error);
		})
	});	
}
/**
 * User Controller
 */
const CONF = require('../config/config');
var multer = require('multer');
var fileUpload = multer({
	dest: CONF.ATTACHMENT.DEST
});

module.exports = function(app, db) {
  db.Attachment.belongsTo(db.User);
  db.User.hasOne(db.Attachment);

	app.get('/users', function(req, res) {
		db.User.findAll().then(function(users) {
			res.send(users);
		})
	});

	app.get('/users/:id', function(req, res) {
		db.User.find({
			where: req.params,
			include: [ db.Attachment ]
		}).then(function(user) {
			res.status(200).send(user);
		}).catch(error => {
			console.error(error);
			res.status(500).send(false);
		})

	});

	app.post('/users/:id', function(req, res) {
		db.User.update(req.body, {
			where: req.params
		}).then(function(user) {
			res.send(user);
		})
	});

	app.post('/users/profile/upload', fileUpload.single('profile-image'), function(req, res) {
		//TODO file upload error 처리
		var newDataId = req.file.filename;
		var userId = req.session.userId;

		var data = {
			id: newDataId,
			originName: req.file.originalname,
			path: req.file.destination,
			mimeType: req.file.mimetype,
			size: req.file.size,
			userId: userId
		};

		db.User.update({
			profile: newDataId
		}, {
			where: { id: userId }
		}).then(user => {
			return db.Attachment.create(data);
		}).then(attachment => {
			return db.Attachment.destroy({
				where: {
					id: {
						'$ne': newDataId
					},
					userId: userId
				}
			})
		}).then(() => {
			res.status(200).send(true);
		}).catch(error => {
			console.error(error);
			res.status(500).send();
		});
	})
};
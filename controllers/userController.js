/**
 * User Controller
 */
const CONF = require('../config/config');
var multer = require('multer');
var fs = require('fs');
var profileUpload = multer({ dest: './uploads/' });

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

	app.post('/users/profile', profileUpload.single('profile'), function(req, res) {
		var userId = req.session.userId;

		db.User.findOne({
			where: {
				id: userId
			},
			include: [ db.Attachment ]
		}).then(user => {
			user = user;
			if(user.attachmentId) {
				var attachment = user.attachment;

				fs.unlink(attachment.path, error => {
					if(error) throw error;
				});
			
				db.Attachment.destroy({
					where: { id: attachment.id }
				});
			};
		}).then(() => {
			var fileInfo = res.req.file;
			var data = {
				id: fileInfo.filename,
				storage: fileInfo.fieldname,
				originName: fileInfo.originalname,
				mimeType: fileInfo.mimetype,
				path: fileInfo.path,
				size: fileInfo.size,
				userId: userId
			};

			return db.Attachment.create(data);
		}).then(attachment => {
			attachmentId = attachment.id;
			return db.User.update({
				attachmentId: attachmentId
			}, {
				where: {
					id: userId
				}
			})
		}).then(() => {
			return db.User.findOne({
				where: {
					id: userId
				}
			});
		}).then(user => {
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
		}).catch(error => {
			throw error;
		})
	}),

	app.get('/users/profile/:id', function(req, res) {
		var filePath;
		var mimeType;

		db.Attachment.findOne({
			where: {
				id: req.params.id
			}
		}).then(attachment => {
			filePath = attachment.path;
			mimeType = attachment.mimeType;

			fs.readFile(filePath, (error, profile) => {
				if(error) throw error;

				res.writeHead(200, { 'Content-Type': mimeType });
				res.end(profile, 'binary');
			})
		})
	})

	app.post('/users/:id', function(req, res) {
		db.User.update(req.body, {
			where: req.params
		}).then(function(user) {
			res.send(user);
		})
	});
};
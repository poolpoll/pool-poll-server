/**
 * Attachment Controller
 */

var fs = require('fs');

module.exports = function(app, db) {

	var AttachmentCtrl = {
		createAttachment: function(data) {
			db.Attachment.create(data).then(attachment => {
				return attachment;
			})
		}
	};

	module.exports = AttachmentCtrl;

	app.get('/attachments/preview/:id', function(req, res) {
		var filePath;
		var mimeType;

		db.Attachment.findOne({
			where: {
				id: req.params.id
			}
		}).then(attachment => {
			filePath = attachment.path;
			mimeType = attachment.mimeType;

			fs.readFile(filePath, (error, attachment) => {
				if(error) {
					throw	error;
				} else {
					res.writeHead(200, { 'Content-Type': mimeType });
					res.end(attachment, 'binary');
				}
			})
		})
	})
};
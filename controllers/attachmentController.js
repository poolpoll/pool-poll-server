/**
 * Attachment Controller
 */

module.exports = function(app, db) {
	app.post('/attachments/read', function(req, res) {
		var fs = require('fs');
		fs.readFile(req.body.path, (error, data) => {
			if(error) {
				console.error(error);
				throw error;
			} else {
				res.status(200).send(data);
			}
		})
	});
};

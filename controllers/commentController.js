/**
 * Comment Controller
 */
const COIN_RULE = require('../config/config').COIN_RULE;

module.exports = function(app, db) {
	db.Comment.belongsTo(db.User);
	db.CommentDetail.belongsTo(db.User);

	/**
	 * Find All Comments API by Poll ID
	 */
	app.get('/comments/:pollId', (req, res) => {

		db.Comment.findAll({
			where: {
				pollId: req.params.pollId
			},
			include: [{
				model: db.User,
				attributes: ['name', 'level', 'attachmentId']
			}]
		}).then(comments => {
			res.send(comments);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	}),

	/**
	 * Find All Detail Comments by Comment ID
	 */
	app.get('/comment_details/:commentId', (req, res) => {
		db.CommentDetail.findAll({
			where: {
				commentId: req.params.commentId
			},
			include: [{
				model: db.User,
				attributes: ['name', 'level', 'attachmentId']
			}]
		}).then(commentDetails => {
			res.send(commentDetails);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	})

	/**
	 * Create Comment API
	 */
	app.post('/comments/:pollId', (req, res) => {
		db.Poll.findOne({
			where: {
				id: req.params.pollId
			}
		}).then(poll => {
			return db.Poll.update({
				commentCount: poll.commentCount + 1
			}, {
				where: {
					id: poll.id
				}
			})
		}).then(() => {
			return db.Comment.create({
				comment: req.body.comment,
				pollId: req.params.pollId,
				userId: req.session.userId
			})
		}).then(comment => {
			res.send(comment);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	}),

	/**
	 * Update Comment API
	 */
	app.put('/comments/:id', (req, res) => {
		db.Comment.update({
			comment: req.body.comment
		}, {
			where: {
				id: req.params.id
			}
		}).then(comment => {
			res.send(comment);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	}),

	/**
	 * Delete Comment API
	 */
	app.delete('/comments/:id', (req, res) => {
		var parentPollId;

		db.Comment.findOne({
			where: {
				id: req.params.id
			}
		}).then(comment => {
			parentPollId = comment.pollId;

			return db.Poll.findOne({
				where: {
					id: parentPollId
				}
			})
		}).then(poll => {
			return db.Poll.update({
				commentCount: poll.commentCount - 1
			}, {
				where: {
					id: parentPollId
				}
			})
		}).then(() => {
			return db.Comment.destroy({
				where: {
					id: req.params.id
				}
			})
		}).then(() => {
			res.send(true);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	})
};
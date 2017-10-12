/**
 * Comment Controller
 */
const COIN_RULE = require('../config/config').COIN_RULE;

module.exports = function(app, db) {
	db.CommentDetail.belongsTo(db.User);

	/**
	 * Create Detail Comment API
	 */
	app.post('/comment_details/:commentId', (req, res) => {
		var parentPollId;

		db.CommentDetail.create({
			comment: req.body.comment,
			commentId: req.params.commentId,
			userId: req.session.userId
		}).then(comment => {
			return db.Comment.findOne({
				where: {
					id: req.params.commentId
				}
			});
		}).then(comment => {
			parentPollId = comment.pollId;
			return db.Comment.update({
				commentDetailCount: comment.commentDetailCount + 1
			},{
				where: {
					id: req.params.commentId
				}
			});
		}).then(comment => {
			return db.Poll.findOne({
				where: {
					id: parentPollId
				}
			});
		}).then(poll => {
			return db.Poll.update({
				commentCount: poll.commentCount + 1
			}, {
				where: {
					id: poll.id
				}
			})
		}).then(poll => {
			res.send(poll);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	}),

	/**
	 * Update Detail Comment API
	 */
	app.put('/comment_details/:id', (req, res) => {
		db.CommentDetail.update({
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
	 * Delete Detail Comment API
	 */
	app.delete('/comment_details/:id', (req, res) => {
		var parentCommentId;
		var parentPollId;

		db.CommentDetail.findOne({
			where: {
				id: req.params.id
			}
		}).then(detailComment => {
			parentCommentId = detailComment.commentId;

			return db.Comment.findOne({
				where: {
					id: parentCommentId
				}
			});
		}).then(comment => {
			parentPollId = comment.pollId;

			return db.Comment.update({
				commentDetailCount: comment.commentDetailCount - 1
			}, {
				where: {
					id: parentCommentId
				}
			});
		}).then(() => {
			return db.Poll.findOne({
				where: {
					id: parentPollId
				}
			});
		}).then(poll => {
			return db.Poll.update({
				commentCount: poll.commentCount - 1
			}, {
				where: {
					id: parentPollId
				}
			});
		}).then(() => {
			return db.CommentDetail.destroy({
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
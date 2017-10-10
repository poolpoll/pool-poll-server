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
				model: db.CommentDetail
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
		db.Comment.create({
			comment: req.body.comment,
			pollId: req.params.pollId,
			userId: req.session.userId
		}).then(comment => {
			res.send(comment);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	}),

	/**
	 * Create Comment Detail API
	 */
	app.post('/comment_details/:commentId', (req, res) => {
		db.CommentDetail.create({
			comment: req.body.comment,
			commentId: req.params.commentId,
			userId: req.session.userId
		}).then(comment => {
			res.send(comment);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	})
};
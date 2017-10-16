/**
 * Like History Controller
 */

module.exports = function(app, db) {

	/**
	 * Create Like History API
	 *
	 * Change Poll Like Count
	 */
	app.post('/like_histories', function(req, res) {
		db.LikeHistory.create({
			pollId: req.body.pollId,
			userId: req.session.userId
		}).then(likeHistory => {
			return db.Poll.findOne({
				where: {
					id: req.body.pollId
				}
			})
		}).then(poll => {
			return db.Poll.update({
				likeCount: poll.likeCount + 1
			}, {
				where: {
					id: req.body.pollId
				}
			})
		}).then(poll => {
			res.send(poll);
		}).catch(error => {
			throw error;
		})
	}),

	/**
	 * Delete Like History API
	 *
	 * Change Poll Like Count
	 */
	app.delete('/like_histories/:id', function(req, res) {
		var pollId;
		db.LikeHistory.findById(req.params.id).then(likeHistory => {
			pollId = likeHistory.pollId;

			return db.Poll.findById(pollId);
		}).then(poll => {
			return db.Poll.update({
				likeCount: poll.likeCount - 1
			}, {
				where: {
					id: pollId
				}
			})
		}).then(() => {
			return db.LikeHistory.destroy({ where: { id: req.params.id }})
		}).then(() => {
			res.send(true);
		}).catch(error => {
			throw error;
		})
	})
};
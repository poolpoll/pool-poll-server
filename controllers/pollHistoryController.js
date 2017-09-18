/**
 * Poll History Controller
 */

module.exports = function(app, db) {
	// poll_histories/' + poll.id;
	app.get('/poll_histories/:pollId', (req, res) => {
		var pollId = req.params.pollId;

		db.PollHistory.find({
			where: {
				pollId: req.params.pollId,
				userId: req.session.userId
			}
		}).then(pollHistories => {
			var result = { pollId: pollId, data: pollHistories };
			res.send(result);
		}).catch(error => {
			throw error;
			console.error(error);
		})
	})
};
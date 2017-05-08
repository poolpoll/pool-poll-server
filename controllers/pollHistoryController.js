/**
 * Poll History Controller
 */
module.exports = function(app, db) {
	app.post('/poll_histories', (req, res) => {
		db.PollHistory.create({
			pollId: req.body.pollId,
			userId: req.session.userId
		}).then(pollHistory => {
			res.send(pollHistory);
		}).catch(error => {
			console.error(error);
			res.send(false);
		})
	});
};
/**
 * Poll Controller
 */
module.exports = function(app, db) {
	app.get('/polls', function(req, res) {
		db.Poll.findAll().then(function(polls) {
			res.send(polls);
		})
	}),
	
	app.get('/polls/my_polls', function(req, res) {
		db.Poll.findAll({
			where: {
				user_id: req.session.user_id
			}
		}).then(function(polls) {
			res.send(polls);
		})
	})

	app.post('/polls/regist', function(req, res) {
		var basicInfo = JSON.parse(req.body.basic_info);
		var questionList = JSON.parse(req.body.question_list);

		db.Poll.create({
			name: basicInfo.name,
			description: basicInfo.description,
			user_id: req.session.user_id,
			from_date: basicInfo.fromDate,
			to_date: basicInfo.toDate
		}).then(function(poll) {
			db.Poll.find({
				where: {
					name: basicInfo.name,
					user_id: req.session.user_id,
				}
			}).then(function(poll) {
				var pollId = poll.id;

				questionList.forEach(function(question) {
					db.Option.create({
						name: question.name,
						poll_id: pollId
					}).then(function(option) {
						db.Option.find({
							where: {
								name: question.name,
								poll_id: pollId
							}
						}).then(function(option) {
							var optionId = option.id;

							question.options.forEach(function(option) {
								db.OptionDetail.create({
									name: option.option,
									option_id: optionId
								})
							})
						})
					})
				})
			})
			res.send(true);
		})
	})
};
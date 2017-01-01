/**
 * Poll Controller
 */
module.exports = function(app, db) {
	app.get('/polls', function(req, res) {
		db.Poll.findAll().then(function(polls) {
			res.send(polls);
		})

	}),
	
	app.get('/polls/:user_id', function(req, res) {
		db.Poll.findAll({
			where: {
				user_id: req.params.user_id
			}
		}).then(function(polls) {
			res.send(polls);
		})
	}),

	app.post('/polls/regist', function(req, res) {
		var name = req.body.name;
		var description = req.body.description;
		var category_id = req.body.category_id;
		var from_date = req.body.from_date;
		var to_date = req.body.to_date;
		var user_id = req.session.user_id;
		console.log('USER ID: ' + user_id);

		var createdPollId;

		db.Poll.create({
			name: name,
			description: description,
			category_id: category_id,
			from_date: from_date,
			to_date: to_date,
			user_id: user_id
		}).then(function(createdPoll) {
			createdPollId = createdPoll.id;
		}, function() {
			res.send(false);
		});

		// var questionList = JSON.parse(req.body.questionList);
		// var newQuestionList = [];


		// questionList.forEach(function(question) {
		// 	var tempObj = {
		// 		poll_id: createdPollId,
		// 		name: question.name,
		// 		options: JSON.stringify(question.options)
		// 	};

		// 	newQuestionList.push(tempObj);
		// });

		// db.Option.bulkCreate(newQuestionList).then(function() {
		// 	res.send(true)
		// }, function() {
		// 	res.send(false)
		// });
	})
};
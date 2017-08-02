/**
 * Poll Controller
 */
module.exports = function(app, db) {
	db.Poll.belongsTo(db.User);

	app.get('/polls', (req, res) => {
		var joinPollIds = [];
		var userId = req.session.userId;

		db.PollHistory.findAll({
			where: { userId: userId }
		}).then(joinPollList => {
			joinPollList.forEach(function(joinPoll) {
				joinPollIds.push(joinPoll.pollId);
			});

			var condition = {};
			if(req.query.name) condition.name = { $like: '%' + req.query.name + '%'	};
			if(req.query.tags) condition.tags = req.query.tags;
			condition.userId = { $ne: req.session.userId };
			condition.activeFlag = true;

			return db.Poll.findAll({
				where: condition,
				include: [{ model: db.User, attributes: ['name', 'level', 'attachmentId']}]
			});
		}).then(polls => {
			joinPollIds.forEach(function(joinPollId) {
				polls.forEach(function(poll) {
					if(joinPollId == poll.id) poll.dataValues.join = true;
				})
			});
			res.send(polls);
		}).catch(error => {
			console.error(error);
			res.send(false);
		})
	})

	app.get('/polls/my_polls', function(req, res) {
		db.Poll.findAll({
			where: { userId: req.session.userId },
			include: [{ model: db.User, attributes: ['name', 'level', 'attachmentId']}]
		}).then(function(polls) {
			res.send(polls);
		})
	}),

	app.get('/polls/tags', function(req, res) {
		db.User.findById(req.session.userId).then(userInfo => {
			if(userInfo.tags) {
				var orOper = [];
				var wrapper = {};				
				var tags = userInfo.tags.replace(/,\s/g, ',');

				var tagList = tags.split(',');
				tagList.forEach(function(tag) {
					wrapper.tags = {
						$like: '%' + tag + '%'
					};

					orOper.push(wrapper);
				});

				return db.Poll.findAll({
					where: { $or: orOper },
					include: [{ model: db.User, attributes: ['name', 'level', 'attachmentId']}]
				});
			} else {
				return null;
			}
		}).then(polls => {
			res.send(polls);
		}).catch(error => {
			throw error;
		})
	});

	app.get('/polls/top/:limit', function(req, res) {
		db.Poll.findAll({
			order: [
				['count', 'desc']
			],
			limit: parseInt(req.params.limit),
			include: [{ model: db.User, attributes: ['name', 'level', 'attachmentId']}]
		}).then( polls => {
			res.status(200).send(polls);
		}).catch(error => {
			throw error;
		})
	}),	

	app.get('/polls/:id', function(req, res) {
		db.Poll.find({
			where: req.params,
			include: [{ model: db.User, attributes: ['name', 'level', 'attachmentId']}]
		}).then(function(poll) {
			res.send(poll);
		}, function(error) {
			throw error;
		})
	}),

	app.post('/polls/regist', (req, res) => {
		var questionList = req.body.questionList;
		db.Poll.create({
			name: req.body.name,
			userId: req.session.userId,
			tags: req.body.tags,
			description: req.body.description,
			fromDate: req.body.fromDate,
			toDate: req.body.toDate			
		}).then(poll => {
			var pollId = poll.id;

			questionList.forEach(function(question) {
				var questionId = question.id;
				var questionName = question.name;
				var optionList = [];

				return db.Question.create({
					pollId: pollId,
					name: question.name,
					multyCheck: question.multyCheck,
					multyCheckLimit: question.multyCheckLimit
				}).then(question => {
					console.log("#######")
					console.log(question);
					console.log("#######")
					questionList.forEach(function(question) {
						if(question.name == questionName) {
							question.options.forEach(function(option) {
								optionList.push({ name: option, questionId: question.id });
							});
						}
					});

					db.Option.bulkCreate(optionList);
				})	
			});
		}).then(() => {
			res.send(true);
		}).catch(error => {
			throw error;
		})
	});

	app.post('/polls/active/:id', (req, res) => {
		db.Poll.update(req.body, { where: req.params}).then(poll => {
			res.send(poll);
		}).catch(error => {
			console.error(error);
			res.send(false);
		})
	}),

	app.delete('/polls/:id', (req, res) => {
		db.Poll.findOne({
			where: req.params,
			include: [{ model: db.User, attributes: ['name', 'level', 'attachmentId']}]
		}).then(poll => {
			return db.Question.findAll({
				where: { pollId: req.params.id }
			})
		}).then(questions => {
			var questionIds = [];
			questions.forEach(function(question) {
				questionIds.push(question.id);
			});
			return db.Option.destroy({	where: { questionId: questionIds }})
		}).then(() => {
			return db.Question.destroy({ where: { pollId: req.params.id }})
		}).then(() => {
			return db.Poll.destroy({ where: { id: req.params.id }})
		}).then(() => {
			return db.PollHistory.destroy({	where: { pollId: req.params.id }})
		}).then(() => {
			res.send(true);
		}).catch(error => {
			console.error(error);
			res.send(false);
		})
	})
};

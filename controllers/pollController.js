/**
 * Poll Controller
 */
module.exports = function(app, db) {
	app.get('/polls', (req, res) => {
		var condition = {};
		if(req.query.name) condition.name = { '$like': '%' + req.query.name + '%'	};
		if(req.query.categoryId) condition.categoryId = req.query.categoryId;
		condition.userId = { '$ne': req.session.userId };
		condition.activeFlag = true;

		db.Poll.findAll({
			where: condition
		}).then(polls => {
			res.send(polls);
		}).catch(error => {
			console.error(error);
			res.send(false);
		})
	}),

	app.get('/polls/my_polls', function(req, res) {
		db.Poll.findAll({
			where: {
				userId: req.session.userId
			}
		}).then(function(polls) {
			res.send(polls);
		})
	}),

	app.get('/polls/:id', function(req, res) {
		db.Poll.find({
			where: req.params
		}).then(function(poll) {
			res.send(poll);
		}, function(error) {
			console.error(error);
			res.send(error);
		})
	}),

	app.post('/polls/regist', (req, res) => {
		db.Poll.create({
			name: req.body.name,
			userId: req.session.userId,
			categoryId: req.body.categoryId,
			description: req.body.description,
			fromDate: req.body.fromDate,
			toDate: req.body.toDate
		}).then(poll => {
			var pollId = poll.id;

			req.body.questionList.forEach(function(question) {
				return db.Question.create({
					pollId: pollId,
					name: question.name,
					multyCheck: question.multyCheck,
					multyCheckLimit: question.multyCheckLimit
				})
			});
		}).then(question => {
			var questionId = question.id;
			var questionName = question.name;
			var optionList = [];

			req.body.questionList.forEach(function(question) {
				if(question.name == questionName) {
					question.options.forEach(function(option) {
						optionList.push({ name: option, questionId: questionId })
					})
				}
			});

			return db.Option.bulkCreate(optionList);
		}).then(() => {
			res.send(true);
		}).catch(error => {
			console.error(error);
			res.status(500).send(error);
		})
	}),

	// app.post('/polls/regist', (req, res) => {
	// 	db.Poll.create({
	// 		name: req.body.name,
	// 		userId: req.session.userId,
	// 		categoryId: req.body.categoryId,
	// 		description: req.body.description,
	// 		fromDate: req.body.fromDate,
	// 		toDate: req.body.toDate
	// 	}).then(poll => {
	// 		var pollId = poll.id;
	//
	// 		req.body.questionList.forEach(function(question) {
	// 			db.Question.create({
	// 				pollId: pollId,
	// 				name: question.name,
	// 				multyCheck: question.multyCheck,
	// 				multyCheckLimit: question.multyCheckLimit
	// 			}).then(question => {
	// 				var questionId = question.id;
	// 				var questionName = question.name;
	// 				var optionList = [];
	//
	// 				req.body.questionList.forEach(function(question) {
	// 					if(question.name == questionName) {
	// 						question.options.forEach(function(option) {
	// 							optionList.push({ name: option, questionId: questionId })
	// 						})
	// 					}
	// 				});
	//
	// 				db.Option.bulkCreate(optionList).then((optionList) => {
	// 					return optionList;
	// 				})
	// 			})
	// 		});
	// 	}).then(() => {
	// 		res.send(true);
	// 	}).catch(error => {
	// 		console.error(error);
	// 		res.status(500).send(false);
	// 	})
	// }),

	app.post('/polls/active/:id', (req, res) => {
		db.Poll.update(req.body, { where: req.params}).then(poll => {
			res.send(poll);
		}).catch(error => {
			console.error(error);
			res.send(false);
		})
	})
};

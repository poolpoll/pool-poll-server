/**
 * Poll Controller
 */
module.exports = function(app, db) {
	app.get('/polls', (req, res) => {
		var condition = {};
		if(req.query.name) condition.name = { '$like': '%' + req.query.name + '%'	};
		if(req.query.categoryId) condition.categoryId = req.query.categoryId;

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
	    categoryId: req.body.categoryId,
	    description: req.body.description,
	    userId: req.session.userId,
	    fromDate: req.body.fromDate,
	    toDate: req.body.toDate
	  }).then(poll => {
	    db.Poll.find({
	      where: { name: req.body.name, userId: req.session.userId }
	    }).then(poll => {
	      var pollId = poll.id;
	      req.body.questionList.forEach(function(questionItem) {
	        db.Question.create({
	          pollId: pollId,
	          name: questionItem.question
	        }).then(question => {
	          db.Question.find({
	            where: { pollId: pollId, name: question.name }
	          }).then(item => {
	            var questionId = item.id;
	            var optionList = [];
	            questionItem.options.forEach(function(option) {
	              var tempOption = { questionId: questionId, name: option };
	              optionList.push(tempOption);
	            });

	            db.Option.bulkCreate(optionList).then(() => {
	              res.send(true);
	            })
	          })
	        })
	      })
	    })
	  }).catch(error => {
			console.error(error);
			res.send(false);
		})
	})
};

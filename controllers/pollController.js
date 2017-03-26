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
				userId: req.session.userId
			}
		}).then(function(polls) {
			res.send(polls);
		})
	}),

	app.post('/polls/regist', function(req, res) {
	  db.Poll.create({
	    name: req.body.name,
	    categoryId: req.body.categoryId,
	    description: req.body.description,
	    userId: req.session.userId,
	    fromDate: req.body.fromDate,
	    toDate: req.body.toDate
	  }).then(function(poll) {
	    db.Poll.find({
	      where: { name: req.body.name, userId: req.session.userId }
	    }).then(function(poll) {
	      var pollId = poll.id;
	      req.body.questionList.forEach(function(questionItem) {
	        db.Question.create({
	          pollId: pollId,
	          name: questionItem.question
	        }).then(function(question) {
	          db.Question.find({
	            where: { pollId: pollId, name: question.name }
	          }).then(function(item) {
	            var questionId = item.id;
	            var optionList = [];
	            questionItem.options.forEach(function(option) {
	              var tempOption = { questionId: questionId, name: option };
	              optionList.push(tempOption);
	            });

	            db.Option.bulkCreate(optionList).then(function() {
	              res.send(true);
	            }, function(error) {
	              console.error(error);
	              res.send(false);
	            })
	          })
	        }, function(error) {
	          console.error(error);
	          res.send(false);
	        })
	      })
	    })
	  }, function(error) {
	    console.error(error);
	    res.send(false);
	  })
	})
};

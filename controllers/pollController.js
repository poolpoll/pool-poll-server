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
	})

	// app.post('/polls/regist', function(req, res) {
	// 	var name = req.body.name;
	// 	var description = req.body.description;
	// 	var category_id = req.body.category_id;
	// 	var from_date = req.body.from_date;
	// 	var to_date = req.body.to_date;

	// 	var questionList = JSON.parse(req.body.question_list);
	// 	var newQuestionList = [];
		
	// 	questionList.forEach(function(question) {
	// 		var tempObj = {
	// 				name: question.name,
	// 				options: JSON.stringify(question.options)
	// 		};
	// 		newQuestionList.push(tempObj);
	// 	});
	// 	var Option = db.Poll.hasMany(db.Option, {as: 'options'});

	// 	db.Poll.create({
	// 		name: name,
	// 		description: description,
	// 		category_id: category_id,
	// 		from_date: from_date,
	// 		to_date: to_date,
	// 		options: [
	// 			newQuestionList
	// 		]
	// 	}, {
	// 		include: [{
	// 			model: Option,
	// 			as: 'options'
	// 		}]
	// 	})
	// })
};
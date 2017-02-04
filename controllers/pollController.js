// /**
//  * Poll Controller
//  */
// module.exports = function(app, db) {
// 	app.get('/polls', function(req, res) {
// 		db.Poll.findAll().then(function(polls) {
// 			res.send(polls);
// 		})
// 	}),
	
// 	app.get('/polls/:user_id', function(req, res) {
// 		db.Poll.findAll({
// 			where: {
// 				user_id: req.params.user_id
// 			}
// 		}).then(function(polls) {
// 			res.send(polls);
// 		})
// 	})

// 	app.post('/polls/regist', function(req, res) {
// 		var basicInfo = JSON.parse(req.basic_info);
// 		basicInfo.user_id = req.session.user_id;
// 		var questionList = JSON.parse(req.question_info);

// 		db.Poll.create(basicInfo).then(function(result) {
// 			console.log('result :' + result);
// 		});

// 		db.Poll.find({
// 			where: {
// 				name: 
// 			}
// 		})	
// 	})
// };
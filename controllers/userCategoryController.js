/**
 * User Category Controller
 */
module.exports = function(app, db) {
  app.get('/user_categories', function(req, res) {
    db.UserCategory.findAll().then(function(userCategories) {
      res.send(userCategories);
    })
  });

  app.get('/user_categories/:id', function(req, res) {
    db.UserCategory.findAll({
      where: {
        userId: req.params.id
      }
    }).then(function(userCategories) {
      var conditionIds = [];

			userCategories.forEach(function(category) {
        conditionIds.push(category.id);
      });

      db.Category.findAll({
        where: {
          id: {
            $in: conditionIds
          }
        }
      }).then(function(categories) {
        res.send(categories);
      })
		});
  });

  app.post('/user_categories/:id', function(req, res) {
    db.UserCategory.destroy({
      where: {
        userId: req.params.id
      }
    }).then(function() {
      db.UserCategory.bulkCreate(req.body.userCategories).then(function() {
        res.send(true);
      }, function(e) {
        console.error(e);
        res.send(false);
      })
    })
    db.UserCategory.create(req.body).then(function() {
      res.send(true);
    }, function(e) {
      console.error(e);
      res.send(false);
    })
  });
};

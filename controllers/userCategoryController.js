/**
 * User Category Controller
 */
module.exports = function(app, db) {
  app.get('/user_categories', function(req, res) {
    db.UserCategory.findAll().then(function(userCategories) {
      res.send(userCategories);
    })
  });

  app.get('/user_categories/:userId', function(req, res) {
    db.Category.findAll().then(function(categories) {
      db.UserCategory.findAll({
        where: { userId: req.params.userId }
      }).then(function(userCategories) {
        var returnValue = [];
        if(userCategories && userCategories.length >= 1) {
          userCategories.forEach(function(userCategory) {
             categories.forEach(function(category) {
               if (userCategory.categoryId == category.id) {
                 returnValue.push(category);
               }
            })
          })
        }
        res.send(returnValue);
      })
    })
  });

  app.post('/user_categories/:userId', function(req, res) {
    db.UserCategory.destroy({
      where: { userId: req.params.userId }
    }).then(function() {
      if(req.body.length > 0) {
        db.UserCategory.bulkCreate(req.body).then(function() {
          res.send(true);
        }, function(e) {
          console.error(e);
          res.send(false);
        })
      }
    })
  });

  app.delete('/user_categories/:userId/:categoryId', function(req, res) {
    db.UserCategory.destroy({
      where: { userId: req.params.userId, categoryId: req.params.categoryId }
    }).then(function() {
      res.send(true);
    }, function(e) {
      console.error(e);
      res.send(false);
    })
  })
};

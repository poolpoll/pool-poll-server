/**
 * Question Controller
 */
module.exports = (app, db) => {
  db.Option.belongsTo(db.Question);
  db.Question.hasMany(db.Option);

  app.get('/questions', (req, res) => {
    db.Question.findAll().then((items) => {
      res.send(items);
    })
  }),

  app.get('/questions/:pollId', (req, res) => {
    db.Question.findAll({
      where: req.params,
      include: [ db.Option ]
    }).then(questions => {
      res.send(questions);
    }).catch(error => {
      console.error(error);
      res.send(false);
    })
  })
};

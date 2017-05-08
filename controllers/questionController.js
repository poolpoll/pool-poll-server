/**
 * Question Controller
 */
module.exports = (app, db) => {
  db.Option.belongsTo(db.Question);
  db.Question.hasMany(db.Option);

  app.get('/questions', (req, res) => {
    db.Question.findAll().then((items) => {
      res.status(200).send(items);
    })
  }),

  app.get('/questions/:pollId', (req, res) => {
    db.Question.findAll({
      where: req.params,
      include: [ db.Option ]
    }).then(questions => {
      res.status(200).send(questions);
    }).catch(error => {
      console.error(error);
      res.status(500).send(false);
    })
  })
};

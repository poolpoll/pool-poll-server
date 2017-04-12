/**
 * Option Controller
 */
module.exports = (app, db) => {
  app.post('/options/add', (req, res) => {
    db.Option.findOne(req.body).then(option => {
      option.count = (option.count) ? option.count + 1 : 1;
      console.log("option")
      console.log("option")
      console.log(option)
      db.Option.update(option, {
        where: { id: option.id }
      }).then((option) => {
        return option;
      })
    }).then(() => {
      res.send(true);
    }).catch(error => {
      console.error(error);
      res.status(500).send(false);
    })
  })
};

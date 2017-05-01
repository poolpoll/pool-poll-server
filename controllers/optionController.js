/**
 * Option Controller
 */
module.exports = (app, db) => {
  app.post('/options/add_count', (req, res) => {
    var userId = req.session.userId;
    var pollId = req.body.pollId;
    var options = req.body.options;

    db.PollHistory.create({
      pollId: pollId,
      userId: userId
    }).then(() => {
      options.forEach(function(option) {
        db.Option.findOne({
           where: { id: option }
        }).then(option => {
          db.Option.update({ count: option.count + 1 }, { where: { id: option.id }})
        }).catch(error => {
          console.error(error);
          res.send(false);
        })
      });

      db.Poll.findOne({
        where: { id: pollId }
  		}).then(poll => {
  			db.Poll.update({ count: poll.count + 1 }, { where: { id: poll.id }
  			})
  		})
    }).then(() => {
      res.send(true);
    }).catch(error => {
      console.error(error);
      res.send(false);
    })
  })
};

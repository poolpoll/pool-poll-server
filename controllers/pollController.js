/**
 * Poll Controller
 */
var multer = require("multer");
var userController = require("./userController");
var mainThumbnailUpload = multer({ dest: "./uploads/main-thumbnails" });
const COIN_RULE = require("../config/config").COIN_RULE;

module.exports = function(app, db) {
  db.Poll.belongsTo(db.User);
  db.Option.belongsTo(db.Poll);

  /**
   * Poll Insert API
   */
  app.post("/polls", mainThumbnailUpload.single("mainthumbnail"), function(
    req,
    res
  ) {
    var fileInfo = res.req.file;
    var poll = {
      name: req.body.name,
      description: req.body.description,
      expireDate: req.body.expireDate,
      expireTime: req.body.expireTime,
      tags: req.body.tags,
      multyCheckLimit: parseInt(req.body.multyCheckLimit),
      userId: req.session.userId
    };

    if (fileInfo) {
      db.Attachment.create({
        id: fileInfo.filename,
        storage: fileInfo.fieldname,
        originName: fileInfo.originalname,
        mimeType: fileInfo.mimetype,
        path: fileInfo.path,
        size: fileInfo.size,
        tags: "mainthumbnail",
        activeFlag: true
      })
        .then(attachment => {
          poll.attachmentId = attachment.id;

          return db.Poll.create(poll);
        })
        .then(poll => {
          db.User.findOne({
            id: req.session.userId
          })
            .then(user => {
              var currentCoin = user.coin;
              return currentCoin + COIN_RULE.REGIST_POLL;
            })
            .then(coin => {
              db.User.update(
                {
                  coin: coin
                },
                {
                  where: {
                    id: req.session.userId
                  }
                }
              );
            });

          res.send(poll);
        })
        .catch(error => {
          throw error;
        });
    } else {
      db.Poll.create(poll)
        .then(poll => {
          res.send(poll);
        })
        .catch(error => {
          throw error;
        });
    }
  }),
    /**
     * Poll Index API
     */
    app.get("/polls", (req, res) => {
      var joinPollIds = [];
      var userId = req.session.userId;

      db.PollHistory.findAll({
        where: { userId: userId },
        limit: 10
      })
        .then(joinPollList => {
          joinPollList.forEach(function(joinPoll) {
            joinPollIds.push(joinPoll.pollId);
          });

          var condition = {};
          if (req.query.name)
            condition.name = { $like: "%" + req.query.name + "%" };
          if (req.query.tags) condition.tags = req.query.tags;
          condition.userId = { $ne: req.session.userId };
          condition.activeFlag = true;

          return db.Poll.findAll({
            where: condition,
            include: [
              { model: db.User, attributes: ["name", "level", "attachmentId"] }
            ]
          });
        })
        .then(polls => {
          joinPollIds.forEach(function(joinPollId) {
            polls.forEach(function(poll) {
              if (joinPollId == poll.id) poll.dataValues.join = true;
            });
          });
          res.send(polls);
        })
        .catch(error => {
          throw error;
          res.send(false);
        });
    }),
    /**
     * Poll Search API
     */
    app.get("/polls/search", (req, res) => {
      var name = req.query.name;
      var page = req.query.page;
      var offset = (page - 1) * 10;
      var attendedPollIds = [];

      db.PollHistory.findAll({
        where: { userId: req.session.userId }
      })
        .then(pollHistories => {
          pollHistories.forEach(function(pollHistory) {
            attendedPollIds.push(pollHistory.pollId);
          });

          return db.Poll.findAll({
            where: {
              $or: {
                name: {
                  $like: "%" + name + "%"
                },
                tags: {
                  $like: "%" + name + "%"
                }
              },
              $and: {
                activeFlag: true
              }
            },
            limit: 10,
            offset: offset,
            include: [
              { model: db.User, attributes: ["name", "level", "attachmentId"] }
            ]
          });
        })
        .then(polls => {
          attendedPollIds.forEach(function(attendedPollId) {
            polls.forEach(function(poll) {
              if (attendedPollId == poll.id) poll.dataValues.isAttended = true;
            });
          });

          res.send(polls);
        })
        .catch(error => {
          throw error;
        });
    }),
    /**
     * My Poll Index API
     */
    app.get("/polls/my_polls", function(req, res) {
      var page = req.query.page;
      var offset = (page - 1) * 10;
      console.log;

      db.Poll.findAll({
        where: { userId: req.session.userId },
        limit: 10,
        offset: offset,
        include: [
          {
            model: db.User,
            attributes: ["name", "level", "attachmentId"]
          }
        ],
        order: [["id"]]
      })
        .then(function(polls) {
          res.send(polls);
        })
        .catch(error => {
          throw error;
        });
    }),
    /**
     * Poll Index By Tags API
     */
    app.get("/polls/tags", function(req, res) {
      var page = req.query.page;
      var offset = (page - 1) * 10;
      var attendedPollIds = [];

      db.PollHistory.findAll({
        where: { userId: req.session.userId }
      })
        .then(pollHistories => {
          pollHistories.forEach(function(pollHistory) {
            attendedPollIds.push(pollHistory.pollId);
          });

          return db.User.findById(req.session.userId);
        })
        .then(userInfo => {
          if (userInfo.tags) {
            var orOper = [];
            var wrapper = {};
            var tags = userInfo.tags.replace(/,\s/g, ",");

            var tagList = tags.split(",");
            tagList.forEach(function(tag) {
              wrapper.tags = {
                $like: "%" + tag + "%"
              };

              orOper.push(wrapper);
            });

            return db.Poll.findAll({
              where: { $or: orOper, activeFlag: true },
              limit: 10,
              offset: offset,
              include: [
                {
                  model: db.User,
                  attributes: ["name", "level", "attachmentId"]
                }
              ]
            });
          } else {
            return [];
          }
        })
        .then(polls => {
          attendedPollIds.forEach(function(attendedPollId) {
            polls.forEach(function(poll) {
              if (attendedPollId == poll.id) poll.dataValues.isAttended = true;
            });
          });

          res.send(polls);
        })
        .catch(error => {
          throw error;
        });
    }),
    /**
     * Poll Index with LIMIT API (Top 100)
     */
    app.get("/polls/top/:limit", function(req, res) {
      var attendedPollIds = [];

      db.PollHistory.findAll({
        where: { userId: req.session.userId }
      })
        .then(pollHistories => {
          pollHistories.forEach(function(pollHistory) {
            attendedPollIds.push(pollHistory.pollId);
          });

          return db.Poll.findAll({
            order: [["count", "desc"]],
            where: {
              activeFlag: true
            },
            limit: parseInt(req.params.limit),
            include: [
              { model: db.User, attributes: ["name", "level", "attachmentId"] }
            ]
          });
        })
        .then(polls => {
          attendedPollIds.forEach(function(attendedPollId) {
            polls.forEach(function(poll) {
              if (attendedPollId == poll.id) poll.dataValues.isAttended = true;
            });
          });

          res.send(polls);
        })
        .catch(error => {
          throw error;
        });
    }),
    /**
     * Poll Get by ID API
     */
    app.get("/polls/:id", function(req, res) {
      var poll;
      var options;

      db.Poll.findOne({
        where: req.params,
        include: [
          {
            model: db.User,
            attributes: ["name", "level", "attachmentId"]
          }
        ]
      })
        .then(function(result) {
          poll = result;

          return db.Option.findAll({
            where: {
              pollId: poll.id
            },
            order: [["id", "desc"]]
          });
        })
        .then(result => {
          options = result;

          return db.LikeHistory.findOne({
            where: {
              pollId: poll.id,
              userId: req.session.userId
            }
          });
        })
        .then(likeHistory => {
          var result = {
            poll: poll,
            options: options,
            like: false
          };

          if (likeHistory) {
            result.like = likeHistory;
          }

          res.send(result);
        })
        .catch(error => {
          throw error;
        });
    }),
    /**
     * Poll Update Active by ID API
     */
    app.post("/polls/active/:id", (req, res) => {
      db.Poll.update(req.body, { where: req.params })
        .then(poll => {
          res.send(poll);
        })
        .catch(error => {
          throw error;
        });
    }),
    /**
     * Poll Delete by ID API
     */
    app.delete("/polls/:id", (req, res) => {
      db.Poll.findOne({
        where: req.params,
        include: [
          { model: db.User, attributes: ["name", "level", "attachmentId"] }
        ]
      })
        .then(poll => {
          return db.Question.findAll({
            where: { pollId: req.params.id }
          });
        })
        .then(questions => {
          var questionIds = [];
          questions.forEach(function(question) {
            questionIds.push(question.id);
          });
          return db.Option.destroy({ where: { questionId: questionIds } });
        })
        .then(() => {
          return db.Question.destroy({ where: { pollId: req.params.id } });
        })
        .then(() => {
          return db.Poll.destroy({ where: { id: req.params.id } });
        })
        .then(() => {
          return db.PollHistory.destroy({ where: { pollId: req.params.id } });
        })
        .then(() => {
          res.send(true);
        })
        .catch(error => {
          throw error;
        });
    }),
    /**
     * Poll Join API
     */
    app.post("/polls/join", (req, res) => {
      var pollId = req.body.pollId;
      var optionIds = req.body.optionIds;
      var userId = req.session.userId;

      db.Poll.findOne({
        where: {
          id: pollId
        }
      })
        .then(poll => {
          var pollCnt = poll.count + 1;

          return db.Poll.update(
            {
              count: pollCnt
            },
            {
              where: {
                id: pollId
              }
            }
          );
        })
        .then(poll => {
          var orWrapper = [];
          optionIds.forEach(function(optionId) {
            var tempObj = { id: optionId };
            orWrapper.push(tempObj);
          });

          db.Option.findAll({
            where: {
              $or: orWrapper
            }
          }).then(options => {
            options.forEach(function(option) {
              option.count = option.count + 1;
            });

            options.forEach(function(option) {
              db.Option.update(
                {
                  count: option.count
                },
                {
                  where: {
                    id: option.id
                  }
                }
              );
            });
          });
        })
        .then(() => {
          var pollHistories = [];
          optionIds.forEach(function(optionId) {
            var tempObj = {
              userId: userId,
              pollId: pollId,
              optionId: optionId
            };
            pollHistories.push(tempObj);
          });

          return db.PollHistory.bulkCreate(pollHistories);
        })
        .then(() => {
          db.User.findOne({
            where: {
              id: req.session.userId
            }
          })
            .then(user => {
              var currentCoin = user.coin;
              return currentCoin + COIN_RULE.JOIN_POLL;
            })
            .then(coin => {
              db.User.update(
                {
                  coin: coin
                },
                {
                  where: {
                    id: req.session.userId
                  }
                }
              );
            });

          res.send(true);
        })
        .catch(error => {
          throw error;
        });
    });
};

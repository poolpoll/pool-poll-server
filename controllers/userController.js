/**
 * User Controller
 */
var multer = require("multer");
var fs = require("fs");
var profileUpload = multer({ dest: "./uploads/profiles" });

module.exports = function(app, db) {
  db.User.belongsTo(db.Attachment);

  app.get("/users/:id", function(req, res) {
    db.User.findOne({
      where: req.params,
      include: [db.Attachment]
    })
      .then(function(user) {
        var data = {
          id: user.id,
          attachmentId: user.attachmentId,
          birthDate: user.birthDate,
          coin: user.coin,
          createdAt: user.createdAt,
          email: user.email,
          level: user.id,
          name: user.name,
          tags: user.tags
        };

        res.send(data);
      })
      .catch(error => {
        throw error;
      });
  });

  app.post("/users/profile", profileUpload.single("profile"), function(
    req,
    res
  ) {
    var userId = req.session.userId;

    db.User.findOne({
      where: {
        id: userId
      },
      include: [db.Attachment]
    })
      .then(user => {
        if (user.attachmentId) {
          var attachment = user.attachment;

          fs.unlink(attachment.path, error => {
            if (error) throw error;
          });

          db.Attachment.destroy({
            where: { id: attachment.id }
          });
        }
      })
      .then(() => {
        var fileInfo = res.req.file;
        var data = {
          id: fileInfo.filename,
          storage: fileInfo.fieldname,
          originName: fileInfo.originalname,
          mimeType: fileInfo.mimetype,
          path: fileInfo.path,
          size: fileInfo.size
        };

        return db.Attachment.create(data);
      })
      .then(attachment => {
        attachmentId = attachment.id;
        return db.User.update(
          {
            attachmentId: attachmentId
          },
          {
            where: {
              id: userId
            }
          }
        );
      })
      .then(() => {
        return db.User.findOne({
          where: {
            id: userId
          }
        });
      })
      .then(user => {
        var userInfo = {
          id: user.id,
          name: user.name,
          email: user.email,
          level: user.level,
          birthDate: user.birthDate,
          gender: user.gender,
          attachmentId: user.attachmentId,
          tags: user.tags
        };

        res.send(userInfo);
      })
      .catch(error => {
        throw error;
      });
  }),
    app.post("/users/:id", function(req, res) {
      db.User.update(req.body, {
        where: req.params
      }).then(function(user) {
        res.send(user);
      });
    });
};

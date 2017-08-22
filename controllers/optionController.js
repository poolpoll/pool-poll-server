/**
 * Option Controller
 */
var multer = require('multer');
var thumbnailUpload = multer({ dest: './uploads/thumbnails' });

module.exports = (app, db) => { 

  app.post('/options', thumbnailUpload.single('thumbnail'), function(req, res) {
    var fileInfo = res.req.file;
    var option = {
      name: req.body.name,
      pollId: req.body.pollId
    };

    if(fileInfo) {
      db.Attachment.create({
        id: fileInfo.filename,
        storage: fileInfo.fieldname,
        originName: fileInfo.originalname,
        mimeType: fileInfo.mimetype,
        path: fileInfo.path,
        size: fileInfo.size,
        tags: 'thumbnail'
      }).then(attachment => {        
        option.attachmentId = attachment.id;

        return db.Option.create(option);
      }).then(option => {
        res.send(option);
      }).catch(error => {
        throw error;
      })
    } else {
      db.Option.create(option).then(option => {
        res.send(option);
      }).catch(error => {
        throw error;
      })
    }
  }),

  app.post('/options/add_count', (req, res) => {
    var userId = req.session.userId;
    var pollId = req.body.pollId;
    var options = req.body.options;

    options.forEach(function(option) {
      db.Option.findOne({
        where: { id: option }
      }).then(option => {
        db.Option.update({ count: option.count + 1}, { where: { id: option.id }})
      }).catch(error => {
        console.error(error);
        res.send(false);
      })
    });

    db.Poll.findOne({
      where: { id: pollId}
    }).then(poll => {
      return db.Poll.update({ count: poll.count + 1 }, { where: { id: poll.id }})
    }).then(poll => {
      res.send(true);
    }).catch(error => {
      console.error(error);
      res.send(false);
    });
  })
};

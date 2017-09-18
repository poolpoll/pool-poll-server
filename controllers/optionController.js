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
  })
};

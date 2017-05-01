const CrudUtil = {

  create: function(target, record) {

  },

  createBulk: function(target, records) {

  },

  findAll: function(target, condition, callback) {
    target.findAll({
      where: condition
    }).then(result => {
      callback(result);
    }).catch(error => {
      console.error(error);
      callback(error);
    })
  },

  findOneById: function(res, target, id) {
    target.findAll({
      where: id
    }).then(result => {
      res.send(result)
    }).catch(error => {
      console.error(error);
      res.send(result);
    })
  },

  update: function(target, record, condition) {

  },

  delete: function(target, id) {

  }
}

module.exports = CrudUtil;

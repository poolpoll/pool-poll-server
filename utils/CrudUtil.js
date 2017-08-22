const CrudUtil = {
	findAll: function(model, condition, callback) {
		model.findAll(condition).then(result => {
			callback(result);
		})
	}
};

module.exports = CrudUtil;
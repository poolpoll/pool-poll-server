/**
 * Category Model
 */
module.exports = function(sequelize, Sequelize) {
	const Category = sequelize.define('categories', {
		name: {
			type: Sequelize.STRING(64)
		},
		description: {
			type: Sequelize.STRING(255)
		},
		userCount: {
			type: Sequelize.INTEGER
		},
		pollCount: {
			type: Sequelize.INTEGER
		}
	}, {
		indexes: [{
			unique: true,
			fields: [ 'name' ]
		}]
	});

	return Category;
};

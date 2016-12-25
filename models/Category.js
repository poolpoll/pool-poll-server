/**
 * Category Model
 */
module.exports = function(sequelize, Sequelize) {
	const Category = sequelize.define('categories', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		user_count: {
			type: Sequelize.INTEGER
		},
		poll_count: {
			type: Sequelize.INTEGER
		}
	}, {
		timestamps: false
	});

	return Category;
};

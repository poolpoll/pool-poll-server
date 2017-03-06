/**
 * User Category Model
 */
module.exports = function(sequelize, Sequelize) {
	const UserCategory = sequelize.define('user_categories', {
    userId: {
      type: Sequelize.INTEGER
    },
    categoryId: {
      type: Sequelize.INTEGER
    }
	}, {
		timestamps: false
	});

	return UserCategory;
};

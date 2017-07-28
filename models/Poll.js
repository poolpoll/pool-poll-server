/**
 * Poll Model
 */
module.exports = function(sequelize, Sequelize) {
	const Poll = sequelize.define('polls', {
		name: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		description: {
			type: Sequelize.STRING(255),
		},
		tags: {
			type: Sequelize.STRING(32),
			allowNull: false
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		fromDate: {
			type: Sequelize.STRING(12)
		},
		toDate: {
			type: Sequelize.STRING(12)
		},
		count: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		activeFlag: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}
	});

	return Poll;
};

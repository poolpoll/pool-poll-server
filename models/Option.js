/**
 * Option Model
 */
module.exports = function(sequelize, Sequelize) {
	const Option = sequelize.define('options', {
		pollId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING(255),
			allowNull: false
		}
	}, {
		timestamps: false
	});

	return Option;
};

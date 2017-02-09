/**
 * OptionDetail Model
 */
module.exports = function(sequelize, Sequelize) {
	const OptionDetail = sequelize.define('option_details', {
		optionId: {
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

	return OptionDetail;
};

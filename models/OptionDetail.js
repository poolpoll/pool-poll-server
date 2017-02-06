/**
 * OptionDetail Model
 */
module.exports = function(sequelize, Sequelize) {
	const OptionDetail = sequelize.define('option_details', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		option_id: {
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false
	});

	return OptionDetail;
};

/**
 * Option Model
 */
module.exports = function(sequelize, Sequelize) {
	const Option = sequelize.define('options', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		poll_id: {
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING
		},
		options: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false
	});

	return Option;
};

/**
 * Option Model
 */
module.exports = function(sequelize, Sequelize) {
	const Option = sequelize.define('options', {
	  questionId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
	  count: {
	    type: Sequelize.INTEGER
	  }
	}, {
		timestamps: false
	});

	return Option;
};

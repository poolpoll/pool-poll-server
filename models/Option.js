/**
 * Option Model
 */
module.exports = function(sequelize, Sequelize) {
	const Option = sequelize.define('options', {
		name: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
	  count: {
	    type: Sequelize.INTEGER
	  },
	  pollId: {
	  	type: Sequelize.INTEGER,
	  	allowNull: false
	  },
	  attachmentId: {
	  	type: Sequelize.STRING(255)
	  }
	}, {
		timestamps: false,
		indexes: [{
			unique: true,
			fields: [ 'pollId', 'name' ]
		}]
	});

	return Option;
};
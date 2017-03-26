/**
 * Question Model
 */
module.exports = function(sequelize, Sequelize) {
  const Question = sequelize.define('questions', {
  	pollId: {
  		type: Sequelize.INTEGER,
  		allowNull: false
  	},
  	name: {
  		type: Sequelize.STRING(64),
  		allowNull: false
  	}
  }, {
  	timestamps: false
  });

	return Question;
};

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
  	},
    multyCheck: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    multyCheckLimit: {
      type: Sequelize.INTEGER
    }
  }, {
  	timestamps: false
  });

	return Question;
};

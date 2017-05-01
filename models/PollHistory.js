/**
 * Poll History Model
 */
module.exports = function(sequelize, Sequelize) {
  const PollHistory = sequelize.define('pollHistories', {
    pollId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [{
      unique: true,
      fields: [ 'pollId', 'userId' ]
    }]
  });

	return PollHistory;
};

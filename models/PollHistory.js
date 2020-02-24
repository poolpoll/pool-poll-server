/**
 * PollHistory Model
 */
module.exports = function(sequelize, Sequelize) {
  const PollHistory = sequelize.define(
    "pollHistories",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      pollId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      optionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["userId", "pollId", "optionId"]
        }
      ]
    }
  );

  return PollHistory;
};

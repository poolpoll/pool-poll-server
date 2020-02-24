/**
 * LikeHistory Model
 */
module.exports = function(sequelize, Sequelize) {
  const LikeHistory = sequelize.define(
    "likeHistories",
    {
      pollId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["pollId", "userId"]
        }
      ]
    }
  );

  return LikeHistory;
};

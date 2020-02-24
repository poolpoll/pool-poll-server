/**
 * Comment Model
 */
module.exports = function(sequelize, Sequelize) {
  const Comment = sequelize.define(
    "comments",
    {
      comment: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      pollId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      commentDetailCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["userId", "comment"]
        }
      ]
    }
  );

  return Comment;
};

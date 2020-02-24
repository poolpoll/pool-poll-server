/**
 * Poll Model
 */
module.exports = function(sequelize, Sequelize) {
  const Poll = sequelize.define(
    "polls",
    {
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      multyCheckLimit: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      tags: {
        type: Sequelize.STRING(32),
        allowNull: false
      },
      expireDate: {
        type: Sequelize.STRING(12),
        allowNull: false
      },
      expireTime: {
        type: Sequelize.STRING(12),
        allowNull: false
      },
      count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      likeCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      commentCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      activeFlag: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["userId", "name"]
        }
      ]
    }
  );

  return Poll;
};

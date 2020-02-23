/**
 * Attachment Model
 */
module.exports = function(sequelize, Sequelize) {
  const Attachment = sequelize.define("attachments", {
    id: {
      type: Sequelize.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    storage: {
      type: Sequelize.STRING(255)
    },
    originName: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    mimeType: {
      type: Sequelize.STRING(32)
    },
    path: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    size: {
      type: Sequelize.INTEGER
    },
    tags: {
      type: Sequelize.STRING(64)
    }
  });

  return Attachment;
};

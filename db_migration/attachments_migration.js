const Sequelize = require('sequelize');
const CONF = require('../config/config');

const sequelize = new Sequelize(CONF.DB.DATABASE, CONF.DB.USER, CONF.DB.PASSWORD, {
  host: CONF.DB.HOST,
  port: CONF.DB.PORT,
  dialect: CONF.DB.DIALECT,
  define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
  }
});

const ATTACHMENT = sequelize.define('attachments', {
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
  }
});

sequelize.sync({
  force: true
});

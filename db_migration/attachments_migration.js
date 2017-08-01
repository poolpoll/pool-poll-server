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
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// const USER = sequelize.define('users', {
//   account: {
//     type: Sequelize.STRING(20),
//     allowNull: false
//   },
//   name: {
//     type: Sequelize.STRING(60),
//     allowNull: false
//   },

//   email: {
//     type: Sequelize.STRING(30),
//     allowNull: false
//   },
//   birthDate: {
//     type: Sequelize.STRING(12)
//   },
//   gender: {
//     type: Sequelize.STRING(20)
//   },
//   attachment_id: {
//     type: Sequelize.STRING(255)
//   },  
//   encryptedPassword: {
//     type: Sequelize.STRING(255),
//     allowNull: false
//   },
//   salt: {
//     type: Sequelize.STRING(255),
//     allowNull: false
//   }
// }, {
//   indexes: [{
//     unique: true,
//     fields: [ 'name', 'account', 'email' ]
//   }]
// });

// USER.belongsTo(ATTACHMENT);
// ATTACHMENT.hasOne(USER);

sequelize.sync({
  force: true
});

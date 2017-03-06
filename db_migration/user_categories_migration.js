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

const USER_CATEGORY = sequelize.define('user_categories', {
	userId: {
		type: Sequelize.INTEGER
	},
	categoryId: {
		type: Sequelize.INTEGER
	}
}, {
  timestamps: false
}, {
  indexes: [{
    unique: true,
    fields: [ 'user_id', 'category_id']
  }]
});

sequelize.sync({
  force: true
});

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

const CATEGORY = sequelize.define('categories', {
	name: {
		type: Sequelize.STRING(64)
	},
	description: {
		type: Sequelize.STRING(255)
	},
	userCount: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	pollCount: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
}, {
	timestamps: false,
	indexes: [{
		unique: true,
		fields: [ 'name' ]
	}]
});

sequelize.sync({
  force: true
});

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

const QUESTION = sequelize.define('questions', {
	pollId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(64),
		allowNull: false
	}
}, {
	timestamps: false,
	indexes: [{
		unique: true,
		fields: [ 'pollId', 'name' ]
	}]
});

sequelize.sync({
  force: true
});

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

const PollHistory = sequelize.define('pollHistories', {
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
}, {
	indexes: [{
		unique: true,
		fields: [ 'userId', 'pollId', 'optionId' ]
	}]
});

sequelize.sync({
	force: true
});

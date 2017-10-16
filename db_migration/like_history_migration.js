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

const LIKE_HISTORY = sequelize.define('likeHistories', {
	pollId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
}, {
	indexes: [{
		unique: true,
		fields: [ 'pollId', 'userId' ]
	}]
});

sequelize.sync({
	force: true
});

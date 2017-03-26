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

const POLL = sequelize.define('polls', {
	name: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	description: {
		type: Sequelize.STRING(255),
	},
	categoryId: {
		type: Sequelize.INTEGER,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	fromDate: {
		type: Sequelize.STRING(12)
	},
	toDate: {
		type: Sequelize.STRING(12)
	},
	count: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	activeFlag: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
}, {
	indexes: [{
		unique: true,
		fields: [ 'userId', 'name' ]
	}]
});

sequelize.sync({
	force: true
});

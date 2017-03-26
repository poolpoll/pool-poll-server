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

const OPTION = sequelize.define('options', {
	questionId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
  count: {
    type: Sequelize.INTEGER
  }
}, {
	timestamps: false,
	indexes: [{
		unique: true,
		fields: [ 'questionId', 'name' ]
	}]
});

sequelize.sync({
  force: true
});

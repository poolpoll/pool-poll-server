const Sequelize = require('sequelize');
const CONF = require('./config');

const sequelize = new Sequelize(CONF.DB.DATABASE, CONF.DB.USER, CONF.DB.PASSWORD,{
	host: CONF.DB.HOST,
	port: CONF.DB.PORT,
	dialect: CONF.DB.DIALECT,
	define: {
		underscored: true
	}
});

const db = {
	Sequelize: Sequelize,
	sequelize: sequelize
};

// Model List
db.Menu = require('../models/Menu.js')(sequelize, Sequelize);

module.exports = db;
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

const COMMENT = sequelize.define('comments', {
	comment: {
		type: Sequelize.STRING(120),
		allowNull: false
	},
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
		fields: [ 'userId', 'comment' ]
	}]
});

const COMMENT_DETAIL = sequelize.define('commentDetails', {
	comment: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
}, {
	indexes: [{
		unique: true,
		fields: [ 'userId', 'comment' ]
	}]
});

COMMENT.hasMany(COMMENT_DETAIL);

sequelize.sync({
	force: true
});

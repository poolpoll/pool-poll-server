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
	tags: {
		type: Sequelize.STRING(32),
		allowNull: false
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

const QUESTION = sequelize.define('questions', {
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

QUESTION.belongsTo(POLL);
POLL.hasMany(QUESTION);

const OPTION = sequelize.define('options', {
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

OPTION.belongsTo(QUESTION);
QUESTION.hasMany(OPTION);

sequelize.sync({
	force: true
});

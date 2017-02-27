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

const USER = sequelize.define('users', {
	account: {
		type: Sequelize.STRING(20),
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(60),
		allowNull: false
	},
	email: {
		type: Sequelize.STRING(30),
		allowNull: false
	},
	birthDate: {
		type: Sequelize.STRING(12)
	},
	gender: {
		type: Sequelize.STRING(20)
	},
	favoriteCategories: {
		type: Sequelize.STRING(255)
	},
	encryptedPassword: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	salt: {
		type: Sequelize.STRING(255),
		allowNull: false
	}
}, {
	indexes: [{
		unique: true,
		fields: [ 'name', 'account', 'email' ]
	}]
});

const CATEGORY = sequelize.define('categories', {
	name: {
		type: Sequelize.STRING(64)
	},
	description: {
		type: Sequelize.STRING(255)
	},
	userCount: {
		type: Sequelize.INTEGER
	},
	pollCount: {
		type: Sequelize.INTEGER
	}
}, {
	indexes: [{
		unique: true,
		fields: [ 'name' ]
	}]
});

const MENU = sequelize.define('menus', {
	rank: {
		type: Sequelize.INTEGER
	},
	name: {
		type: Sequelize.STRING(62)
	},
	description: {
		type: Sequelize.STRING(255)
	},
	route: {
		type: Sequelize.STRING(10)
	}
}, {
	timestamps: false,
	indexes: [{
		unique: true,
		fields: [ 'name' ]
	}]
});

const POLL = sequelize.define('polls', {
	name: {
		type: Sequelize.STRING(255),
		allowNull: false
	},
	description: {
		type: Sequelize.STRING(255),
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
});

const OPTION = sequelize.define('options', {
	pollId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: false
	}
}, {
	timestamps: false
});

const OPTION_DETAIL = sequelize.define('option_details', {
	optionId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: false
	}
}, {
	timestamps: false
});

sequelize.sync();

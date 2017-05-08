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
	attachment_id: {
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

const USER_CATEGORY = sequelize.define('user_categories', {
	userId: {
		type: Sequelize.INTEGER
	},
	categoryId: {
		type: Sequelize.INTEGER
	}
}, {
  timestamps: false
}, {
  indexes: [{
    unique: true,
    fields: [ 'userId', 'categoryId']
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
		type: Sequelize.STRING(32)
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

const QUESTION = sequelize.define('questions', {
	name: {
		type: Sequelize.STRING(64),
		allowNull: false
	},
	multyCheck: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	multyCheckLimit: {
		type: Sequelize.INTEGER
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
    type: Sequelize.INTEGER,
		defaultValue: 0
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

const POLL_HISTORY = sequelize.define('pollHistory', {
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

const ATTACHMENT = sequelize.define('attachments', {
  id: {
  	type: Sequelize.STRING(255),
  	allowNull: false,
  	primaryKey: true
  },
  originName: {
  	type: Sequelize.STRING(255),
  	allowNull: false
  },
  mimeType: {
  	type: Sequelize.STRING(32)
  },
  path: {
  	type: Sequelize.STRING(255),
  	allowNull: false
  },
  size: {
  	type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

USER.belongsTo(ATTACHMENT);
ATTACHMENT.hasOne(USER);

sequelize.sync({
	force: true
});

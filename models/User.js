/**
 * User Model
 */
module.exports = function(sequelize, Sequelize) {
	const User = sequelize.define('users', {
		name: {
			type: Sequelize.STRING(24),
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
		attachmentId: {
			type: Sequelize.INTEGER(255)
		},
		tags: {
			type: Sequelize.TEXT,
		},
		level: {
			type: Sequelize.INTEGER(255),
			defaultValue: 1,
			allowNull: false
		},
		coin: {
			type: Sequelize.INTEGER(255),
			defaultValue: 0,
			allowNull: false
		},
		encryptedPassword: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		salt: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		activeCode: {
			type: Sequelize.STRING(8)
		},		
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: false
		}		
	}, {
		indexes: [{
			unique: true,
			fields: [ 'name', 'email' ]
		}]
	});

	return User;
};

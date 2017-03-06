/**
 * User Model
 */
module.exports = function(sequelize, Sequelize) {
	const User = sequelize.define('users', {
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
		encryptedPassword: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		salt: {
			type: Sequelize.STRING(255),
			allowNull: false
		}
	});

	return User;
};

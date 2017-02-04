/**
 * User Model
 */
module.exports = function(sequelize, Sequelize) {
	const User = sequelize.define('users', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		account: {
			type: Sequelize.STRING
		},
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		birth_date: {
			type: Sequelize.STRING
		},
		gender: {
			type: Sequelize.STRING
		},
		favorite_categories: {
			type: Sequelize.STRING
		},
		encrypted_password: {
			type: Sequelize.STRING
		},
		salt: {
			type: Sequelize.STRING
		},
		sign_up_date: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false		
	});

	return User;
};
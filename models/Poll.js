/**
 * Poll Model
 */
module.exports = function(sequelize, Sequelize) {
	const Poll = sequelize.define('polls', {
		name: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
		},
		multyCheckLimit: {
			type: Sequelize.INTEGER,
			defaultValue: 1
		},
		tags: {
			type: Sequelize.STRING(32),
			allowNull: false
		},
		userId: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		expireDate: {
			type: Sequelize.STRING(12)
		},
		expireTime: {
			type: Sequelize.STRING(12)
		},
		count: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		activeFlag: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		},
		attachmentId: {
			type: Sequelize.TEXT
		}
	});

	return Poll;
};

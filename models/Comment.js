/**
 * Comment Model
 */
module.exports = function(sequelize, Sequelize) {
	const Comment = sequelize.define('comments', {
		comment: {
			type: Sequelize.STRING(255),
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

	return Comment;
};

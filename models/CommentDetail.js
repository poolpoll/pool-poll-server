/**
 * CommentDetail Detail Model
 */
module.exports = function(sequelize, Sequelize) {
	const CommentDetail = sequelize.define('commentDetails', {
		comment: {
			type: Sequelize.STRING(255),
			allowNull: false
		},
		commentId: {
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

	return CommentDetail;
};

module.exports = function(sequelize, Sequelize) {
	const Poll = sequelize.define('polls', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		user_id: {
			type: Sequelize.INTEGER
		},
		from_date: {
			type: Sequelize.STRING
		},
		to_date: {
			type: Sequelize.STRING
		},
		count: {
			type: Sequelize.INTEGER
		}
	}, {
		timestamps: false		
	});

	return Poll;
};
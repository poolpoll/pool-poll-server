/**
 * Menu Model
 */
module.exports = function(sequelize, Sequelize) {
	const Menu = sequelize.define('menus', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		rank: {
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING
		},
		description: {
			type: Sequelize.STRING
		},
		route: {
			type: Sequelize.STRING
		}
	}, {
		timestamps: false		
	});

	return Menu;
};

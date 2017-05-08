/**
 * Attachment Model
 */
module.exports = function(sequelize, Sequelize) {
	const Attachment = sequelize.define('Attachments', {
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

	return Attachment;
};
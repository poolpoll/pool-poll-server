var dateFormat = require('dateformat');

var DateTimeUtill = {

	dateFormating: function(date, format) {
		return dateFormat(date, format);
	},

	getDate: function() {
		return dateFormat(new Date, 'yyyy-mm-dd');
	},

	getDateTime: function() {
		return dateFormat(new Date, 'yyyy-mm-dd HH:mm');
	}
}

module.exports = DateTimeUtill;
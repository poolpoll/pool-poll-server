var sha256 = require('sha256');


var AuthUtll = {
	encryptPassword: function(pwd) {
		var salt = '아이 짜구워';
		return sha256(salt + pwd);
	}
}

module.exports = AuthUtll;
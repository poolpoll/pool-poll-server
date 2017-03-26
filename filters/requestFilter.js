/**
 * request filter
 */

module.exports = function(app, db) {
	app.all('*', function(req, res, next) {
		if(req.session.userId || req.url == '/auth/sign_in' || req.url == '/auth/sign_up' || req.method == 'OPTIONS') {
			next();
		} else {
			res.status(401).send('Unauthorized.');
		}
	});
};

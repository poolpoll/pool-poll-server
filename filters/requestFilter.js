/**
 * request filter
 */

module.exports = function(app) {
  app.all("*", function(req, res, next) {
    if (
      req.session.userId ||
      req.url.substring(0, 6) == "/auth/" ||
      req.method == "OPTIONS"
    ) {
      next();
    } else {
      res.status(401).send("Unauthorized.");
    }
  });
};

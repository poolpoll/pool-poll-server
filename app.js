/**
 * Modules
 */
var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

/**
 * Module Attache Section
 */
app.use(
  session({
    secret: "zxlckjvlkalLKAJDLKJlkvcz(!#(*%231",
    resave: false,
    saveUninitialized: true
  })
);

// app.use(cors());

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:8081");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Custom Modules
 * Routes
 */
const db = require("./config/db.js");
const config = require("./config/config");

require("./utils/CrudUtil");
require("./utils/SchedulerUtil")(db);

require("./filters/requestFilter")(app);
require("./controllers/menuController")(app, db);
require("./controllers/userController")(app, db);
require("./controllers/authController")(app, db);
require("./controllers/pollController")(app, db);
require("./controllers/pollHistoryController")(app, db);
require("./controllers/likeHistoryController")(app, db);
require("./controllers/optionController")(app, db);
require("./controllers/commentController")(app, db);
require("./controllers/commentDetailController")(app, db);
require("./controllers/attachmentController")(app, db);

/**
 * Custom Module Attache Section
 */
app.listen(config.APP.PORT, function() {
  console.log("Server running on port " + config.APP.PORT);
});

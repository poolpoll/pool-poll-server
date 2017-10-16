/**
 * Modules
 */
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

/**
 * Module Attache Section
 */
app.use(session({
    secret: 'zxlckjvlkalLKAJDLKJlkvcz(!#(*%231',
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
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
const db = require('./config/db.js');
const CrudUtil = require('./utils/CrudUtil');
const SchedulerUtil = require('./utils/SchedulerUtil')(db);

const requestFilter = require('./filters/requestFilter')(app);
const menuController = require('./controllers/menuController')(app, db);
const userController = require('./controllers/userController')(app, db);
const authController = require('./controllers/authController')(app, db);
const pollController = require('./controllers/pollController')(app, db);
const pollHistoryController = require('./controllers/pollHistoryController')(app, db);
const likeHistoryController = require('./controllers/likeHistoryController')(app, db);
const optionController = require('./controllers/optionController')(app, db);
const commentController = require('./controllers/commentController')(app, db);
const commentDetailController = require('./controllers/commentDetailController')(app, db);
const attachmentController = require('./controllers/attachmentController')(app, db);

/**
 * Custom Module Attache Section
 */
app.listen(3000, function() {
	console.log('Server running on port 3000');
});

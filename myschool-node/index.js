
const path = require('path');
module.exports.publicPath = path.join(__dirname + "/public");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./middleware/routes');
errorHandler = require("./middleware/error-handler");
const cookieParser = require('cookie-parser')
const logger = require('morgan')

app.use(logger('dev'))
// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json()).use(express.urlencoded())

// COOKIE PARSER
app.use(cookieParser());

// DATABASE
require("./middleware/database");

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Origin", "http://localhost:4200")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, PUT, DELETE, OPTIONS")
    if (req.method === 'OPTIONS') {
        res.sendStatus(200)
    } else {
        next();
    }
}) 

// ROUTES
routes.addRoutes(app);

// SERVER PING 
app.get('/ping', (req, res) => res.status(200).send('Api Working'))

// UI
app.use(express.static(path.join(__dirname, 'dist')));
app.get("/", (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));

// ERROR HANDLING
errorHandler.handleError(app)

const port = process.env.PORT || 80;
app.listen(port, '0.0.0.0', () => console.log(`\nApp is running on ${port}!`));
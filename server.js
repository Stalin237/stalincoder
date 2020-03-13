"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use('/app', express.static(path.join(__dirname, '/app')));

/** MongoDB Connection */
mongoose.connect('mongodb://localhost/employee');
mongoose.connection.on('error', function (error) { console.error('Error in MongoDB Connection: ' + error); });
mongoose.connection.on('reconnected', function () { console.log('MongoDB Reconnected!'); });
mongoose.connection.on('disconnected', function () { console.log('MongoDB Disconnected!'); });
mongoose.connection.on('connected', function () { console.log("Mongo connected!"); });

require('./routes')(app);

module.exports = app; // for testing

app.listen(3000, function() {
 console.log("Server is running on port 3000");
});



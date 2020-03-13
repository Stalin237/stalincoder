var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema({
	empid: String,
    name: String,
    age: Number,
    gender: String,
    salary: Number,
    email: String,
    mobile: Number
});

var employee = mongoose.model('employee', schema, 'employee');
module.exports = employee;
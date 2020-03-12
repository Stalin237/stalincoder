"use strict";

var path = require('path');
var absPath = path.join(__dirname, "../../CRUD/app");

module.exports = function (app) {
	try {
		var crud = require('../controller/crud.js')(app);

		app.get('/', function (req, res) {
			res.sendFile(absPath + "/views/index.html");
		});

		app.get('/employees', crud.getEmployees);

		app.post('/employees/create', crud.createEmployee);

		app.post('/employees/edit', crud.editEmployee);

		app.post('/employees/update', crud.updateEmployee);

		app.post('/employees/delete', crud.deleteEmployee);
	} catch (e) {
        console.log('Error On Site', e);
    }
}
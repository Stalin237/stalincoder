module.exports = function (app) {
	var bcrypt = require('bcrypt-nodejs');
	var CryptoJS = require('node-cryptojs-aes').CryptoJS;
	var Employee   = require('../schema/employee');

	var router = {};

	router.getEmployees = function(req, res) {
		Employee.find({}, function(err, employees) {
			if(err) {
				res.send({'status': 0, 'error': err});
			} else {
				res.send(employees);
			}
		});
	};

	router.editEmployee = function(req, res) {
		Employee.findOne({_id: req.body.id}, function(err, employees) {
			if(err) {
				res.send({'status': 0, 'error': err});
			} else {
				res.send(employees);
			}
		});
	};

	router.updateEmployee = function(req, res) {
		var empdata = req.body.empdata;
		Employee.findOne({ 'email' :  empdata.email }, function(err, employee) {
			if(err) {
				res.send({'status': 0, 'error': err});
			} else if(employee) {
				res.send({'message': 'Email Exists'});
			} else {
				Employee.update({_id: req.body.id}, empdata, function(err, result) {
					if(err) {
						res.send({'status': 0, 'error': err});
					} else {
						res.send(result);
					}
				});
			}
		});
	};

	router.createEmployee = function (req, res) {
		Employee.findOne({ 'email' :  req.body.email }, function(err, employee) {
            if (err) {
                res.send({'status': 0, 'error': err});
            } else {
	            if (employee) {
	                res.send({'message': 'Email Exists'});
	            } else {
	                var newEmp = new Employee();
	                newEmp.empid = 'EMP'+Math.floor(Math.random() * 100) + 1;
	                newEmp.name = req.body.name;
	                newEmp.age    = req.body.age;
	                newEmp.gender = req.body.gender;
	                newEmp.salary = req.body.salary
	                newEmp.mobile = req.body.mobile;
	                newEmp.email = req.body.email;

	                newEmp.save(function(err, employee) {
	                    if (err) {
	                        res.send({'message': 'Error'});
	                    } else {
	                    	res.send({'message': 'Success'});
	                    }
	                });
	            }  
	        }
        });
	};

	router.deleteEmployee = function(req, res) {
		Employee.remove({_id: req.body.id}, {}, function(err, result) {
			if(err) {
				res.send({'status': 0, 'error': err});
			} else {
				res.send(result);
			}
		});
	};
	
	return router;
};
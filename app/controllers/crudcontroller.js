var app = angular.module('crudapp')
.controller('retrieveEmpCtrl', retrieveEmpCtrl)
.controller('createEmpCtrl', createEmpCtrl)
.controller('updateEmpCtrl', updateEmpCtrl)
.controller('deleteEmpCtrl', deleteEmpCtrl);

retrieveEmpCtrl.$inject = ['$scope', 'CRUDService'];
createEmpCtrl.$inject = ['$scope', '$state', '$window', 'CRUDService'];
updateEmpCtrl.$inject = ['$scope', '$state', '$window', 'CRUDService', '$stateParams', 'EmployeeResolve'];
deleteEmpCtrl.$inject = ['$scope', '$state', '$window', 'CRUDService', '$stateParams'];

function retrieveEmpCtrl($scope, CRUDService) {
    CRUDService.retrieve().then(function(response) {
        if(response.status == 0) {
            alert('Unable to get data');
        } else {
            $scope.employees = response;
        }
    });
};

function createEmpCtrl($scope, $state, $window, CRUDService) {
    var cec = this;
    cec.createEmployee = function(isvalid) {
        if(isvalid) {
            CRUDService.create(cec.empdetails).then(function(response) {
                if(response.status == 0) {
                    alert('Unable to get data');
                } else if(response.message == 'Email Exists') {
                    alert('Email Already Exists');
                } else if(response.message == 'Success') {
                    $window.location.href = '/';
                }
            });
        } else {
            alert('Enter all the required fields');
        }
    };
};

function updateEmpCtrl($scope, $state, $window, CRUDService, $stateParams, EmployeeResolve) {
    var uec = this;
    uec.empdetails = EmployeeResolve;

    uec.updateEmployee = function() {
        CRUDService.update($stateParams.id, uec.empdetails).then(function(response) {
            if(response.status == 0) {
                alert('Unable to update data');
            } else if(response.message == 'Email Exists') {
                alert('Email Already Exists');
            } else {
                $window.location.href = '/';
            }
        });
    };
};

function deleteEmpCtrl($scope, $state, $window, CRUDService, $stateParams) {
    CRUDService.delete($stateParams.id).then(function(response) {
        if(response.status == 0 || response.ok != 1) {
            alert('Unable to delete data');
        } else {
            $window.location.href = '/';
        } 
    });
};
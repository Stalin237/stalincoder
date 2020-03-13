var app = angular.module('crudapp', ['ui.router']);

app.config(['$stateProvider','$routeProvider',
  function($stateProvider, $routeProvider) {
    $stateProvider
    .state("landing", {
        url:'/',
        templateUrl: 'app/views/index.html'
      })
    .state("create", {
        url:'/employee/create',
        templateUrl: 'app/views/create.html',
        controller: 'createEmpCtrl',
        controllerAs: 'CEC'
      })
    .state("edit", {
        url:'/employee/edit/:id',
        templateUrl: 'app/views/edit.html',
        controller: 'updateEmpCtrl',
        controllerAs: 'UEC',
        reloadOnSearch: false,
        resolve: {
          EmployeeResolve: function(CRUDService, $stateParams) {
            return CRUDService.edit($stateParams.id);
          }
        }
      })
    .state("delete", {
        url:'/employee/delete/:id',
        controller: 'deleteEmpCtrl',
        controllerAs: 'DEC'
      });
  }
]);

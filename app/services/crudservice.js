var app = angular.module('crudapp');
app.factory('CRUDService', CRUDService);
CRUDService.$inject = ['$http', '$q'];

function CRUDService($http, $q) {

    var service = {};

    service.retrieve = function () {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/employees'
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.create = function (empdata) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/employees/create',
            data: empdata
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.edit = function (empid) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/employees/edit',
            data: {id: empid}
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.update = function (empid, empdata) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/employees/update',
            data: {id: empid, empdata: empdata}
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    service.delete = function (empid) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/employees/delete',
            data: {id: empid}
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    return service;
}
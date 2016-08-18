(function () {
    'use strict';

    angular.module('app').service('DataSvc', DataSvc);

    DataSvc.$inject = ['$http'];

    function DataSvc($http) {
        var service = this;
        service.register = register;

        function register(data) {
            return $http({
                url: '/users/signup',
                data: JSON.stringify(data),
                method: 'POST'
            });
        }
    }
})();
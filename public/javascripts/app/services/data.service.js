(function () {
    'use strict';

    angular.module('app').service('DataSvc', DataSvc);

    DataSvc.$inject = ['$http', '$log'];

    function DataSvc($http, $log) {
        this.accessThirdParty = accessThirdParty;
        this.checkAuth = checkAuth;
        this.isAuthenticated = false;
        
        function checkAuth() {
            return $http.get('/users/auth');
        }

        function accessThirdParty(key) {
            return $http.get('/' + key);
        }
        
    }

})();
(function () {
    'use strict';

    angular.module('app').service('AuthSvc', AuthSvc);

    AuthSvc.$inject = ['$http', '$log']

    function AuthSvc($http, $log) {
        this.accessThirdParty = accessThirdParty;
        this.setAuth = setAuth;

        function accessThirdParty(key) {
            return $http.get('/' + key);
        }

        function setAuth(authkey, provider) {
            return $http.get('/' + provider + '/' + authkey);
        }
    }
})();
(function () {
    'use strict';

    angular.module('app').service('AuthSvc', AuthSvc);

    AuthSvc.$inject = ['$http', '$log', 'AUTH_ENDPOINT']

    function AuthSvc($http, $log, AUTH_ENDPOINT) {
        this.accessThirdParty = accessThirdParty;
        this.setAuth = setAuth;
        var isAuthenticated = false;
        var authToken;
        
        function accessThirdParty(key) {
            return $http.get('/' + key);
        }

        function setAuth(authkey, provider, callback) {
            $http.get('/' + provider + '/' + authkey).then(function(res){
               window.sessionStorage.setItem('token', res.data.token);
               useCredentials(res.data.token);
               callback(res.data.username);
            });
        }

        function logout() {
            return $http.post('/logout');
        }

        function useCredentials(token) {
            isAuthenticated = true;
            authToken = token;
            $http.defaults.headers.common.Authorization = authToken;
        }
    }
})();
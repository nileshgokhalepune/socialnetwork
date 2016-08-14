(function () {
    'use strict';

    angular.module('app').service('AuthSvc', AuthSvc);

    AuthSvc.$inject = ['$http', '$log', 'AUTH_ENDPOINT']

    function AuthSvc($http, $log, AUTH_ENDPOINT) {
        var service = this;
        service.accessThirdParty = accessThirdParty;
        service.setAuth = setAuth;
        service.getUserData = getUserData;
        service.useCredentials = useCredentials;
        service.getUserName = getUserName;
        service.destroy = destroy;
        service.logout = logout;
        //service.CheckCors = CheckCors;
        service.userdata;
        service.isAuthenticated = false;
        service.authToken;

        function accessThirdParty(key) {
            return $http.get('/' + key);
        }

        function setAuth(authkey, provider, callback) {
            $http.get('/' + provider + '/' + authkey).then(function (res) {
                service.useCredentials(res.data);
                callback(res.data.user);
            });
        }

        function logout() {
            destroy();
            return $http.post('/logout');
        }

        function destroy() {
            window.sessionStorage.removeItem('token');
            window.sessionStorage.removeItem('ud');
            service.isAuthenticated = false;
            service.authToken = null;
            service.userdata = null;
            $http.defaults.headers.common.Authorization = "";
        }

        function useCredentials(data) {
            window.sessionStorage.setItem('token', data.token);
            window.sessionStorage.setItem('ud', JSON.stringify(data.user));
            service.isAuthenticated = true;
            service.authToken = data.token;
            service.userdata = data.user;
            $http.defaults.headers.common.Authorization = service.authToken;
        }

        function getUserName() {
            if (JSON.parse(window.sessionStorage.getItem('ud'))) {
                return JSON.parse(window.sessionStorage.getItem('ud')).username;
            } else {
                return null;
            }
        }

        function getUserData() {
            return JSON.parse(window.sessionStorage.getItem('ud'));
        }

        // function CheckCors() {
        //     $http({
        //         url: 'http://localhost:61414/home',
        //         withCredentials: true,
        //         method: 'GET'
        //     }).then(function (gotit) {
        //         alert("got it");
        //     }, function (ehhh) {
        //         alert("error");
        //     });
        // }
    }
})();
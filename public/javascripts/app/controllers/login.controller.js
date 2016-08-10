(function () {
    'use strict';
    angular.module('app').controller('loginCtrl', loginCtrl)

    loginCtrl.$inject = ['$scope', '$state', '$window', 'AuthSvc'];

    function loginCtrl($scope, $state, $window, AuthSvc) {
        $scope.authdata;
        $scope.login = login;
        $scope.thirdparty = thirdparty;
        $scope.setAuth = setAuth;

        function login() {
        }

        function thirdparty(thirdparty) {
            AuthSvc.accessThirdParty(thirdparty).then(function (res) {
                $scope.authdata = res.data.oauthData.split('&');
                var token = $scope.authdata[0].split('=')[1];
                var secrent = $scope.authdata[1].split('=')[1];
                var win = window.open(res.data.tokenUri + "?oauth_token=" + token, "Authentication", "height=200;width=200");
            }, function (err) {
                alert("In Error" + err);
            });
        }

        function setAuth(authToken, provider) {
            AuthSvc.setAuth(authToken, provider).then(function (res) {
                $window.sessionStorage.setItem('token', res.data);
                $scope.localValue = $window.sessionStorage.getItem('token');
                $state.go('start', null, { reload: true });
                //location.reload();
            }, function (err) {
                debugger;
            })
        }
    }
})();

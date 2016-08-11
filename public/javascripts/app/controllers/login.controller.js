(function () {
    'use strict';
    angular.module('app').controller('loginCtrl', loginCtrl)

    loginCtrl.$inject = ['$scope', '$state', '$window', '$interval', 'AuthSvc'];

    function loginCtrl($scope, $state, $window, $interval, AuthSvc) {
        $scope.authdata;
        $scope.login = login;
        $scope.thirdparty = thirdparty;
        $scope.setAuth = setAuth;
        $scope.loggingin = false;
        var promise;
        $scope.start = function (win, message) {
            $scope.stop();
            promise = $interval(function () {
                if (win.closed) {
                    alert(message);
                    $scope.loggingin = false;
                    $scope.stop();
                }

            }, 1000);
        }
        $scope.stop = function () {
            $interval.cancel(promise);
        }
        function login() {
        }

        function thirdparty(thirdparty) {
            $scope.loggingin = true;
            AuthSvc.accessThirdParty(thirdparty).then(function (res) {
                $scope.authdata = res.data.oauthData.split('&');
                var token = $scope.authdata[0].split('=')[1];
                var secrent = $scope.authdata[1].split('=')[1];
                var win = window.open(res.data.tokenUri + "?oauth_token=" + token, "Authentication", "height=200;width=200");
                $scope.start(win, 'Hmmm got it. You want to use some other method to register yourself instead of ' + thirdparty);
            }, function (err) {
                alert("In Error" + err);
                $scope.loggingin = false;
            });
        }

        function setAuth(authToken, provider) {
            $scope.loggingin = true;
            AuthSvc.setAuth(authToken, provider, function (data) {
                window.sessionStorage.setItem('name', data.user)
                $scope.loggingin = false;
                $state.go('home', null, { reload: true });
            });

        }
    }
})();

(function () {
    'use strict';

    angular.module('app').controller('homeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$window', 'AuthSvc'];

    function HomeCtrl($scope, $window, AuthSvc) {
        $scope.username;
        $scope.logout = logout;

        activate();

        function activate() {
            var token = $window.sessionStorage.getItem('token');
            $scope.username = token.username;
        }

        function logout() {

        }
    }

})();
(function () {
    'use strict';

    angular.module('app').controller('homeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$state', '$window', 'AuthSvc'];

    function HomeCtrl($scope, $state, $window, AuthSvc) {
        $scope.username;
        $scope.logout = logout;

        activate();

        function activate() {
            var token = $window.sessionStorage.getItem('token');
            $scope.username = AuthSvc.getUserName();
        }

        function logout() {
            AuthSvc.logout();
            $state.go('guest');
        }
    }

})();
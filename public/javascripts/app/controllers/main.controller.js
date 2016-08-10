(function () {
    'use strict';

    angular.module('app').controller('mainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$window', '$state'];

    function MainCtrl($scope, $window, $state) {
        $scope.someLabel = "Nilesh";
        $scope.isAuthentic = false;
        $scope.authenticate = authenticate;
        $scope.login = login;
        $scope.register = register;

        activate();

        function activate() {
            $scope.authenticate();
            if(!$scope.isAuthentic){
                $state.go('guest');
            }else{
                $state.go('home');
            }
        }

        function authentic() {
            if ($window.sessionStorage.getItem('token')) {
                return true;
            } else {
                return false;
            }
        }

        function authenticate() {
            if ($window.sessionStorage.getItem('token')) {
                $scope.isAuthentic = true;
            } else {
                $scope.isAuthentic = false;
            }
            console.log("Nilesh11" + $scope.isAuthentic);
        }

        function login() {
            //show login dialog
        }

        function register() {
            //show register dialog
        }
    }
})();
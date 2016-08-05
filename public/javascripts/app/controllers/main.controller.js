(function(){
    'use strict';
    
    angular.module('app').controller('mainCtrl',MainCtrl);
    
    MainCtrl.$inject = ['$scope'];
    
    function MainCtrl($scope){
        
        $scope.authentic = authentic;
        $scope.login = login;
        $scope.register = register;
        function authentic() {
            return false;
        }
        
        function login() {
            //show login dialog
        }
        
        function register(){
            //show register dialog
        }
    }
})();
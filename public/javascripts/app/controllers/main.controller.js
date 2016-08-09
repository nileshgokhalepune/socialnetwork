(function(){
    'use strict';
    
    angular.module('app').controller('mainCtrl',MainCtrl);
    
    MainCtrl.$inject = ['$scope','$window'];
    
    function MainCtrl($scope,$window){
        $scope.someLabel ="Nilesh";
        $scope.isAuthentic = false;
        $scope.authenticate = authenticate;
        $scope.login = login;
        $scope.register = register;
        
        activate();
        
        function  activate() {
            $scope.authenticate();
        }
    
        function authenticate() {
            debugger;
            if($window.sessionStorage.getItem('token')){
                $scope.isAuthentic =  true;
            }else{
                $scope.isAuthentic =   false;
            }
            console.log($scope.isAuthentic);
        }
        
        function login() {
            //show login dialog
        }
        
        function register(){
            //show register dialog
        }
    }
})();
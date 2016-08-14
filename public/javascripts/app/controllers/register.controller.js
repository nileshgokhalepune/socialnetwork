(function(){
    'use strict';
    
    angular.module('app').controller('registerCtrl',RegisterCtrl);
    
    RegisterCtrl.$inject = ['$scope','toastr'];
    
    function RegisterCtrl($scope, toastr){
        $scope.register= register;
        $scope.pw;
        function register(){
            if(!$scope.name || $scope.name === ''){
                toastr.error('You must have a name');
                return;
            }
            if(!$scope.registerUserName || $scope.registerUserName === ''){
                toastr.error('Well ' + $scope.name + ' you need a screenname')
                return;
            }
            if(!$scope.registerPassword || $scope.registerPassword === ''){
                toastr.error('Well ' + $scope.name + ' you have nice screenname, but you need to secure your acccount. So please enter the password!')
                return; 
            }
        }
    }
})();
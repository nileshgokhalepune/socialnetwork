(function(){
    'use strict';
    
    angular.module('app').controller('registerCtrl',RegisterCtrl);
    
    RegisterCtrl.$inject = ['$scope'];
    
    function RegisterCtrl($scope){
        $scope.register= register;
        
        function register(){
            if(!$scope.name || $scope.name === ''){
                
            }
        }
    }
})();
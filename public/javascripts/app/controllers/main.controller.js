(function () {
    'use strict';

    angular.module('app').controller('mainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$state', 'DataSvc', 'SharedService', '$location'];

    function MainCtrl($scope, $state, DataSvc, SharedService, $location) {

        activate();

        function activate() {
            if (SharedService.IsAuthenticatedUser()) {
              $state.go('start');  
            }else{
                $state.go('login');
            }
        }

    }
})();
 
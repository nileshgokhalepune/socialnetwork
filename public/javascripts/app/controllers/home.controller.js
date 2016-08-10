(function () {
    'use strict';

    angular.module('app').controller('homeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', '$window'];

    function HomeCtrl($scope, $window) {
        $scope.username;
        activate();

        function activate() {
            var token = $window.sessionStorage.getItem('token');
            $scope.username = token.username;
        }
    }

})();
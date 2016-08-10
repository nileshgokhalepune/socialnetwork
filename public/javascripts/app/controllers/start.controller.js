(function () {
    'use strict';

    angular.module('app').controller('startCtrl', StartCtrl);

    StartCtrl.$inject = ['$scope', '$window'];

    function StartCtrl($scope, $window) {
        $scope.username;
        activate();

        function activate() {
            var token = $window.sessionStorage.getItem('token');
            $scope.username = token.username;
        }

    }

})();
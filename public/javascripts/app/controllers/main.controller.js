(function () {
    'use strict';

    angular.module('app').controller('mainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', '$stateProvider', 'DataSvc'];

    function MainCtrl($scope, $stateProvider, DataSvc) {

        activate();

        function activate() {
            DataSvc.checkAuth().then(function (res) {
                if (res.data == true) {
                    $state.go('/start');
                } else {
                    $state.go('/login');
                }
            }, function (err) {

            })
        }

    }
})();
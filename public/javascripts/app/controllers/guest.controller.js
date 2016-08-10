(function() {
    'use strict';

    angular.module('app').controller('guestCtrl', GuestCtrl);
    GuestCtrl.$inject = ['$scope'];

    function GuestCtrl($scope){
        $scope.message = "Hi There, You are on the right track, just get signed in and get started with new kind of experience";
    }
})();
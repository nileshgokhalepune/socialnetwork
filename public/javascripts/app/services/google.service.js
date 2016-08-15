(function () {
    'use strict';

    angular.module('app').service('GoogleSvc', GoogleSvc);

    GoogleSvc.$inject = ['$http'];

    function GoogleSvc($http) {
        var service = this;

        service.getPlaces = getPlaces;

        function getPlaces(searchText) {
            console.log(searchText);
            return $http({
                url: '/api/places?search=' + searchText,
                method: 'GET'
            });
        }
    }
})();
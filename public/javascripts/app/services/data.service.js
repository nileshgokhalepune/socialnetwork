(function(){
    'use strict';

    angular.module('app').service('DataSvc',DataSvc);

    DataSvc.$inject = ['$http','$log'];

    function DataSvc($http, $log){
        this.accessThirdParty = accessThirdParty;

        function accessThirdParty(key){
            return $http.get('/api');
        }
    }

})();
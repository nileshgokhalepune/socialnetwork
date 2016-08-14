(function () {
    'use strict';

    angular.module('app').controller('registerCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope', 'toastr', 'DataSvc', 'GoogleSvc'];

    function RegisterCtrl($scope, toastr, DataSvc, GoogleSvc) {
        $scope.register = register;
        $scope.searchCity = searchCity;
        $scope.pw;
        function register() {
            if (!$scope.name || $scope.name === '') {
                toastr.error('You must have a name');
                return;
            }
            if (!$scope.registerUserName || $scope.registerUserName === '') {
                toastr.error('Well ' + $scope.name + ' you need a screenname')
                return;
            }
            if (!$scope.registerGender || $scope.registerGender == '') {
                toastr.error('It would be better if you could specify the Gender.');
                return;
            }
            if ((!$scope.registerDobDD || $scope.registerDobDD === '')) {
                toastr.error('Day of your birth is necessary');
                return;
            }
            if ((!$scope.registerDobMM || $scope.registerDobMM === '')) {
                toastr.error('Month of your birth is necessary');
                return;
            }
            if (!$scope.registerDobYY || $scope.registerDobYY === '') {
                toastr.error('Year of your birht is necessary.');
                return;
            }
            if (!$scope.registerCity || $scope.registerCity === '') {
                toastr.error('It will be nice to know from which wonderfull town/city you stay in');
                return;
            }
            if (!$scope.registerEmail || $scope.registerEmail === '') {
                toastr.error('Well we need your email address just in case you need to recover your account.');
                return;
            }
            if (!$scope.registerPassword || $scope.registerPassword === '') {
                toastr.error('Well ' + $scope.name + ' you have nice screenname, but you need to secure your acccount. So please enter the password!')
                return;
            }
        }

        function searchCity() {
            GoogleSvc.getPlaces($scope.registerCity).then(function(res){
                alert(res.data);
            },function(){

            });
        }
    }
})();
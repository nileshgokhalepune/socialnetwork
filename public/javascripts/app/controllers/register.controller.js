(function () {
    'use strict';

    angular.module('app').controller('registerCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope', '$state', '$stateParams', 'toastr', 'DataSvc', 'GoogleSvc', 'AuthSvc'];

    function RegisterCtrl($scope, $state, $stateParams, toastr, DataSvc, GoogleSvc, AuthSvc) {
        $scope.user = {};
        $scope.register = register;
        $scope.searchCity = searchCity;
        $scope.selectPlace = selectPlace;
        $scope.navigate = navigate;
        $scope.focused = focused;
        $scope.isActive = false;
        $scope.places = new Array();
        $scope.pw;

        activate();

        function activate() {
            if ($stateParams && !$stateParams.userdata === "" && !$scope.isActive) {
                toastr.success('We are almost there, you just need to fill in few fields that are required to get you started.')
                var userdata = JSON.parse($stateParams.userdata);
                $scope.user.name = userdata.username;
                $scope.user.city = userdata.location;
                $scope.user.username = userdata.username ? userdata.username : userdata.name;
                $scope.isActive = true;
            }
        }

        function register() {
            if ($scope.registerForm.$invalid) {
                return;
            }
            DataSvc.register($scope.user).then(function (res) {
                toastr.success(res.data);
                $state.go('home');
            }, function (err) {
                toastr.error(err);
            });
            // if (!$scope.user.name || $scope.user.name === '') {
            //     toastr.error('You must have a name');
            //     return;
            // }
            // if (!$scope.user.userName || $scope.user.userName === '') {
            //     toastr.error('Well ' + $scope.user.name + ' you need a screenname')
            //     return;
            // }
            // if (!$scope.user.gender || $scope.user.gender == '') {
            //     toastr.error('It would be better if you could specify the Gender.');
            //     return;
            // }
            // if ((!$scope.user.dobDD || $scope.user.dobDD === '')) {
            //     toastr.error('Day of your birth is necessary');
            //     return;
            // }
            // if ((!$scope.user.dobMM || $scope.user.dobMM === '')) {
            //     toastr.error('Month of your birth is necessary');
            //     return;
            // }
            // if (!$scope.user.dobYY || $scope.user.dobYY === '') {
            //     toastr.error('Year of your birht is necessary.');
            //     return;
            // }
            // if (!$scope.user.city || $scope.user.city === '') {
            //     toastr.error('It will be nice to know from which wonderfull town/city you stay in');
            //     return;
            // }
            // if (!$scope.user.email || $scope.user.email === '') {
            //     toastr.error('Well we need your email address just in case you need to recover your account.');
            //     return;
            // }else if(!validateEmail($scope.user.email)){
            //     toastr.error('Invalid email address.');
            //     return;
            // }
            // if (!$scope.user.password || $scope.user.password === '') {
            //     toastr.error('Well ' + $scope.user.name + ' you have nice screenname, but you need to secure your acccount. So please enter the password!')
            //     return;
            // }
        }

        function searchCity($event) {
            if ($event.keyCode === 27) {
                $scope.places = [];
            }
            if ($event.keyCode == 40) {
                var ele = $event.currentTarget.nextSibling.children[0].children[0];
                $(ele).addClass('active');
                $(ele).focus();
            } else {
                GoogleSvc.getPlaces($scope.user.city).then(function (res) {
                    $scope.places = res.data;
                }, function () {

                });
            }
        }
        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        function navigate($event) {
            var ele;
            if ($event.keyCode === 40) {
                ele = $event.currentTarget.nextSibling();
                $(ele).focus();
            } else if ($event.keyCode === 38) {
                ele = $event.currentTarget.prevSibling();
                $(ele).focus();
            }
            $scope.user.city = $(ele).text();
        }

        function focused($event) {
            var ele = $event.currentTarget;
            $(ele).addClass('active').siblings().removeClass('active');
        }

        function selectPlace(place) {
            $scope.user.city = place;
            $scope.places = [];
        }
    }
})();
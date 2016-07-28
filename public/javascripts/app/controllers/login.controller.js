(function () {
    'use strict';
    angular.module('app').controller('loginCtrl', loginCtrl)

    loginCtrl.$inject = ['$scope', 'DataSvc'];

    function loginCtrl($scope, DataSvc) {
        $scope.authdata;
        $scope.login = login;

        function login(thirdparty) {
            DataSvc.accessThirdParty(thirdparty).then(function (res) {
                alert(res.data);
                $scope.authdata = res.data.oauthData.split('&');
                var token = $scope.authdata[0].split('=')[1];
                var secrent = $scope.authdata[1].split('=')[1];
                var win = window.open(res.data.tokenUri + "?oauth_token=" + token, "_blank");
            }, function (err) {
                alert(err);
            });
        }
    }
})();

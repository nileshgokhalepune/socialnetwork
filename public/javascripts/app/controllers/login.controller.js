(function () {
    'use strict';
    angular.module('app').controller('loginCtrl', loginCtrl)

    loginCtrl.$inject = ['$scope', '$state', 'AuthSvc'];

    function loginCtrl($scope, $state, AuthSvc) {
        $scope.authdata;
        $scope.login = login;
        $scope.thirdparty = thirdparty;
        $scope.setAuth = setAuth;
        
        function login() {
        }

        function thirdparty(thirdparty) {
            AuthSvc.accessThirdParty(thirdparty).then(function (res) {
                $scope.authdata = res.data.oauthData.split('&');
                var token = $scope.authdata[0].split('=')[1];
                var secrent = $scope.authdata[1].split('=')[1];
                var win = window.open(res.data.tokenUri + "?oauth_token=" + token, "Authentication", "height=200;width=200");
            }, function (err) {
                alert("In Error" + err);
            });
        }
        
        function setAuth(authToken,provider){
            AuthSvc.setAuth(authToken,provider).then(function(res){
                debugger;
                alert(res.data);
                
            },function(err){
                
            })
            alert(authToken);
        }
    }
})();

(function () {
    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('start');

        $stateProvider
            .state('modal', {
                views: {
                    'modal': {
                        templateUrl: "partials/modal"
                    }
                },
                abstract: true
            });
        $stateProvider
            .state('modal.login', {
                views: {
                    'modal': {
                        templateUrl: 'partials/login', controller: 'loginCtrl'
                    }
                }
            });
        $stateProvider
            .state('modal.register',{
                views:{
                    'modal':{
                        templateUrl:'partials/register', controller:'registerCtrl'
                    }
                }
            });
        $stateProvider
            .state('start', { template: '<h1>Start</h1>' })
    });

})();

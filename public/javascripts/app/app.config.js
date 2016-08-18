(function () {
    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('home', { templateUrl: 'partials/home', controller: 'homeCtrl' })

        $stateProvider
            .state('guest', { templateUrl: 'partials/guest', controller: 'guestCtrl' });

        $stateProvider
            .state('guest.modal', {
                views: {
                    'modal': {
                        templateUrl: "partials/modal"
                    }
                },
                abstract: true
            });
        $stateProvider
            .state('guest.modal.login', {
                views: {
                    'modal': {
                        templateUrl: 'partials/login', controller: 'loginCtrl'
                    }
                }
            });
        $stateProvider
            .state('guest.modal.register', {
                url:'register/:userdata',
                views: {
                    'modal': {
                        templateUrl: 'partials/register', controller: 'registerCtrl'
                    }
                }
            });

        $stateProvider
            .state('transition', {
                url: 'transition?destination',
                controller: function ($state, $stateParams) {
                    $state.go($stateParams.destination);
                }
            })
    });

})();

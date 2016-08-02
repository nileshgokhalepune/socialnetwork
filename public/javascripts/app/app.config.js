(function () {
    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('/main');
        
        $stateProvider
            .state('/login', { templateUrl: 'partials/login', controller: 'loginCtrl' })
            .state('/start', { templateUrl: 'partials/start', controller: 'startCtrl' })
            .state('/main', { templateUrl: 'partials/main', controller: 'mainCtrl' });
    });

})();

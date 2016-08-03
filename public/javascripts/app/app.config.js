(function () {
    angular.module('app').config(function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise('start');
        
        $stateProvider
            .state('login', { templateUrl: 'partials/login', controller: 'loginCtrl' })
            .state('start', {template:'<h1>Start</h1>'}) 
    });

})();

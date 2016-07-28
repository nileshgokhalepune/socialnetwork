(function () {
    angular.module('app').config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', { templateUrl: 'partials/login', controller: 'loginCtrl' })
            .otherwise({ templateUrl: 'partials/login', controller: 'loginCtrl' });
    });

})();

(function () {
    'use strict';

    angular.module('app', ['ngResource', 'ngRoute', 'ui.router','ngAnimate', 'app.directives','toastr']) 
        .constant('AUTH_ENDPOINT','users');

})();


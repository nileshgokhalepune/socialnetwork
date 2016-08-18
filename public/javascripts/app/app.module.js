(function () {
    'use strict';

    angular.module('app', ['ngResource', 'ngRoute', 'ui.router','ngAnimate', 'app.directives','toastr','ngMessages']) 
        .constant('AUTH_ENDPOINT','users');

})();


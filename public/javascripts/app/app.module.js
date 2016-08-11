(function () {
    'use strict';

    angular.module('app', ['ngResource', 'ngRoute', 'ui.router','ngAnimate']) 
        .constant('AUTH_ENDPOINT','users');
})();


(function () {
    'use strict';

    angular.module('app', ['ngResource', 'ngRoute', 'ui.router']) 
        .constant('AUTH_ENDPOINT','users');
})();


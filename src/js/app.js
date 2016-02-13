define([
    'jquery',
    'angular',
    'angularRoute',
    'angularBootstrap',
    'common/header',
    'common/footer',
    'pages/about',
    'pages/home',
],
($, angular) => {
    angular.module('takeChargeHealth', 
        [
            'ngRoute', 
            'ui.bootstrap',
            'header',
            'footer',
            'home',
            'about',
        ])
        .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
});
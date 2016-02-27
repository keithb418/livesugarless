define([
    'jquery',
    'angular',
    'angularAnimate',
    'angularRoute',
    'angularBootstrap',
    'angularResource',
    'common/header',
    'common/footer',
    'pages/about',
    'pages/blog',
    'pages/home',
],
($, angular) => {
    angular.module('takeChargeHealth', 
        [
            'ngRoute',
            'ngAnimate',
            'ngResource',
            'ui.bootstrap',
            'header',
            'footer',
            'home',
            'blog',
            'about',
        ])
        .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
});
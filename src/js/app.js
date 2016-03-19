define([
    'jquery',
    'angular',
    'angularAnimate',
    'angularRoute',
    'angularBootstrap',
    'angularBootstrapTemplates',
    'angularResource',
    'services/validationServices',
    'common/header',
    'common/footer',
    'popups/contactMe',
    'pages/about',
    'pages/home',
],
($, angular) => {
    angular.module('takeChargeHealth', 
        [
            'ngRoute',
            'ngAnimate',
            'ngResource',
            'ui.bootstrap',
            'ui.bootstrap.tpls',
            'header',
            'footer',
            'home',
            'about',
            'contact',
            'validation'
        ])
        .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
});